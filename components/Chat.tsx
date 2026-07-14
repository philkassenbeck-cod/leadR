"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { stripMarkdown } from "@/lib/stripMarkdown";
import { createConversation, saveMessage, getLastConversation } from "@/lib/conversations";
import { supabase } from "@/lib/supabase";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Profile = {
  full_name?: string;
  bio?: string;
  top5?: string[];
  language?: string;
  disc_primary?: string;
  disc_secondary?: string;
  insights_primary?: string;
  insights_secondary?: string;
};

type LastSession = {
  conversation: { id: string; title: string; created_at: string };
  messages: { role: string; content: string; created_at: string }[];
} | null;

type Props = {
  agentId: string;
  context?: Record<string, unknown>;
  placeholder?: string;
  welcomeMessage?: string;
  language?: string;
};

export default function Chat({ agentId, context = {}, placeholder, welcomeMessage, language = "en" }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [lastSession, setLastSession] = useState<LastSession>(null);
  const [listening, setListening] = useState(false);
  const [micSupported, setMicSupported] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const [ttsLoadingIdx, setTtsLoadingIdx] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const speakTokenRef = useRef(0);

  useEffect(() => {
    loadUserAndProfile();
  }, []);

  async function loadUserAndProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    setIsLoggedIn(!!user);
    
    if (user) {
      const { data } = await supabase
        .from("profiles")
        .select("full_name, bio, top5, language, disc_primary, disc_secondary, insights_primary, insights_secondary")
        .eq("id", user.id)
        .single();
      
      if (data) {
        setProfile(data);
      }

      // Load last conversation
      const last = await getLastConversation(agentId);
      if (last && last.messages.length > 0) {
        setLastSession(last);
      }
    }
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    let convId = conversationId;
    if (!convId && isLoggedIn) {
      const conv = await createConversation(agentId, text.slice(0, 50));
      if (conv) {
        convId = conv.id;
        setConversationId(conv.id);
      }
    }

    if (convId) {
      await saveMessage(convId, "user", text);
    }

    const enrichedContext = {
      ...context,
      profile: profile ? {
        name: profile.full_name,
        bio: profile.bio,
        top5: profile.top5,
        language: profile.language,
        disc: profile.disc_primary ? {
          primary: profile.disc_primary,
          secondary: profile.disc_secondary,
        } : null,
        insights: profile.insights_primary ? {
          primary: profile.insights_primary,
          secondary: profile.insights_secondary,
        } : null,
      } : null,
      lastSession: lastSession ? {
        date: lastSession.conversation.created_at,
        summary: lastSession.messages.slice(-6).map(m => ({
          role: m.role,
          content: m.content.slice(0, 500),
        })),
      } : null,
    };

    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ messages: newMessages, agentId, context: enrichedContext }),
      });
      if (res.status === 401) {
        setMessages([...newMessages, { role: "assistant", content: "Pour discuter avec le coach, connecte-toi d'abord — [Se connecter](/login)." }]);
        return;
      }
      if (res.status === 429) {
        setMessages([...newMessages, { role: "assistant", content: "Tu as atteint ta limite d'échanges pour aujourd'hui. Reviens demain 🙂" }]);
        return;
      }
      const data = await res.json();
      const assistantMessage = data.response;
      
      setMessages([...newMessages, { role: "assistant", content: assistantMessage }]);

      if (autoPlay && assistantMessage) {
        speak(assistantMessage, newMessages.length);
      }

      if (convId) {
        await saveMessage(convId, "assistant", assistantMessage);
      }

      // Clear lastSession after first message (so we don't keep referencing it)
      setLastSession(null);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Une erreur s'est produite. Réessaie." }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  function handleInput() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    setMicSupported(!!(w.SpeechRecognition || w.webkitSpeechRecognition));
    setAutoPlay(localStorage.getItem("leadr-tts-autoplay") === "1");
    // Précharge les voix de synthèse (chargées en différé) pour éviter qu'une
    // voix anglaise lise le français au premier clic.
    if ("speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
  }, []);

  function ttsLang(): string {
    const appLang = language || profile?.language;
    const nav = (typeof navigator !== "undefined" ? navigator.language : "").toLowerCase();
    if (appLang === "fr" || nav.startsWith("fr")) return "fr-FR";
    if (appLang === "de" || nav.startsWith("de")) return "de-DE";
    return "en-US";
  }

  function stopAudio() {
    speakTokenRef.current++; // invalide toute lecture en cours de préparation
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setPlayingIdx(null);
  }

  // Repli gratuit : synthèse vocale intégrée du navigateur (voix FR), si ElevenLabs indisponible.
  function speakBrowser(text: string, idx: number) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      stopAudio();
      return;
    }
    window.speechSynthesis.cancel();
    const lang = ttsLang();
    const base = lang.slice(0, 2);
    const norm = (l: string) => l.replace("_", "-").toLowerCase();
    const voices = window.speechSynthesis.getVoices();
    // Force une vraie voix de la bonne langue (FR par défaut), en préférant les voix locales.
    const voice =
      voices.find((v) => norm(v.lang) === norm(lang) && v.localService) ||
      voices.find((v) => norm(v.lang) === norm(lang)) ||
      voices.find((v) => norm(v.lang).startsWith(base) && v.localService) ||
      voices.find((v) => norm(v.lang).startsWith(base)) ||
      null;
    const utter = new SpeechSynthesisUtterance(stripMarkdown(text));
    utter.lang = voice ? voice.lang : lang;
    if (voice) utter.voice = voice;
    utter.rate = 0.95;
    utter.onend = () => setPlayingIdx(null);
    utter.onerror = () => setPlayingIdx(null);
    setPlayingIdx(idx);
    window.speechSynthesis.speak(utter);
  }

  async function speak(text: string, idx: number) {
    if (playingIdx === idx) {
      stopAudio();
      return;
    }
    stopAudio(); // incrémente le token → annule toute lecture précédente encore en préparation
    const token = ++speakTokenRef.current;
    setTtsLoadingIdx(idx);

    let blobUrl: string | null = null;
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (token !== speakTokenRef.current) return; // remplacée par une lecture plus récente
      if (!res.ok) throw new Error("tts " + res.status);
      const blob = await res.blob();
      if (token !== speakTokenRef.current) return;
      blobUrl = URL.createObjectURL(blob);
    } catch (err) {
      if (token !== speakTokenRef.current) return;
      setTtsLoadingIdx(null);
      // Échec réseau/ElevenLabs → repli sur la voix du navigateur.
      console.warn("TTS ElevenLabs indispo, repli voix navigateur:", err);
      speakBrowser(text, idx);
      return;
    }

    if (token !== speakTokenRef.current) {
      URL.revokeObjectURL(blobUrl);
      return;
    }
    audioUrlRef.current = blobUrl;
    const audio = new Audio(blobUrl);
    audioRef.current = audio;
    audio.onended = () => stopAudio();
    audio.onerror = () => stopAudio();
    setPlayingIdx(idx);
    setTtsLoadingIdx(null);
    // Lecture bloquée (politique autoplay) → on arrête, PAS de repli navigateur (évite la double lecture).
    audio.play().catch(() => stopAudio());
  }

  function toggleAutoPlay() {
    setAutoPlay((prev) => {
      const next = !prev;
      localStorage.setItem("leadr-tts-autoplay", next ? "1" : "0");
      if (!next) stopAudio();
      return next;
    });
  }

  function toggleMic() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const rec = new SR();
    const appLang = language || profile?.language;
    const nav = (typeof navigator !== "undefined" ? navigator.language : "").toLowerCase();
    // Langue explicite de l'app OU langue du navigateur (français par défaut pour un navigateur FR)
    rec.lang =
      appLang === "fr" || nav.startsWith("fr")
        ? "fr-FR"
        : appLang === "de" || nav.startsWith("de")
        ? "de-DE"
        : "en-US";
    rec.interimResults = false;
    rec.continuous = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (e: any) => {
      const transcript = Array.from(e.results)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((r: any) => r[0].transcript)
        .join(" ")
        .trim();
      if (transcript) setInput((prev) => (prev ? prev + " " : "") + transcript);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recognitionRef.current = rec;
    setListening(true);
    rec.start();
  }

  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    if (profile?.language === "fr") return "Décris ta situation...";
    if (profile?.language === "de") return "Beschreibe deine Situation...";
    return "Describe your situation...";
  };

   const getWelcome = () => {
    const lang = language || profile?.language || "en";
    
    if (profile?.full_name && lastSession) {
      const date = new Date(lastSession.conversation.created_at).toLocaleDateString(
        lang === "fr" ? "fr-FR" : lang === "de" ? "de-DE" : "en-US"
      );
      if (lang === "fr") {
        return `Bon retour ${profile.full_name} ! La dernière fois (${date}), on a travaillé ensemble. Tape "résumé" pour une synthèse, ou continue avec une nouvelle question.`;
      } else if (lang === "de") {
        return `Willkommen zurück ${profile.full_name}! Letztes Mal (${date}) haben wir zusammengearbeitet. Tippe "zusammenfassung" für eine Synthese, oder stelle eine neue Frage.`;
      }
      return `Welcome back ${profile.full_name}! Last time (${date}), we worked together. Type "summary" for a recap, or continue with a new question.`;
    }
    if (profile?.full_name && welcomeMessage) {
      if (lang === "fr") return `Bon retour, ${profile.full_name} ! ${welcomeMessage}`;
      if (lang === "de") return `Willkommen zurück, ${profile.full_name}! ${welcomeMessage}`;
      return `Welcome back, ${profile.full_name}! ${welcomeMessage}`;
    }
    if (profile?.full_name) {
      if (lang === "fr") return `Bon retour, ${profile.full_name} ! Qu'aimerais-tu explorer aujourd'hui ?`;
      if (lang === "de") return `Willkommen zurück, ${profile.full_name}! Was möchtest du heute erkunden?`;
      return `Welcome back, ${profile.full_name}! What would you like to explore today?`;
    }
    return welcomeMessage;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {getWelcome() && messages.length === 0 && (
          <div className="text-gray-400 text-sm text-center pt-8">{getWelcome()}</div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "user" ? (
              <div className="max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap bg-gray-900 text-white rounded-br-sm">
                {m.content}
              </div>
            ) : (
              <div className="max-w-[80%]">
                <div className="rounded-2xl px-4 py-3 text-sm leading-relaxed bg-gray-100 text-gray-800 rounded-bl-sm">
                  <div className="md">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                  </div>
                </div>
                <button
                  onClick={() => speak(m.content, i)}
                  type="button"
                  className="mt-1 ml-1 text-xs text-gray-400 hover:text-gray-700 transition-colors"
                >
                  {ttsLoadingIdx === i ? "… audio" : playingIdx === i ? "⏸︎ Stop" : "▶︎ Écouter"}
                </button>
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="px-4 pb-6">
        <div className="flex items-end gap-2 border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-gray-400 transition-colors bg-white">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            placeholder={getPlaceholder()}
            rows={1}
            className="flex-1 resize-none text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
            style={{ maxHeight: "160px" }}
          />
          <button
            onClick={toggleAutoPlay}
            type="button"
            aria-label="Lecture automatique à voix haute"
            title={autoPlay ? "Lecture auto activée" : "Lecture auto désactivée"}
            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
              autoPlay ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-500 hover:text-gray-800"
            }`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M11 5 6 9H2v6h4l5 4V5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 6a9 9 0 0 1 0 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          {micSupported && (
            <button
              onClick={toggleMic}
              type="button"
              aria-label="Dictée vocale"
              title={listening ? "Arrêter la dictée" : "Parler"}
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                listening ? "bg-red-500 text-white animate-pulse" : "bg-gray-100 text-gray-500 hover:text-gray-800"
              }`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          <button
            onClick={send}
            disabled={!input.trim() || loading}
            className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center disabled:opacity-30 transition-opacity flex-shrink-0"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 12V2M2 7l5-5 5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-300 text-center mt-2">
          {(language || profile?.language) === "fr" ? "Entrée pour envoyer · Shift+Entrée pour nouvelle ligne" : 
           (language || profile?.language) === "de" ? "Enter zum Senden · Shift+Enter für neue Zeile" :
           "Enter to send · Shift+Enter for new line"}
        </p>
      </div>
    </div>
  );
}

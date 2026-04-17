"use client";

import { useState, useRef, useEffect } from "react";
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
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
      } : null,
      lastSession: lastSession ? {
        date: lastSession.conversation.created_at,
        summary: lastSession.messages.slice(-6).map(m => ({
          role: m.role,
          content: m.content.slice(0, 500),
        })),
      } : null,
    };

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, agentId, context: enrichedContext }),
      });
      const data = await res.json();
      const assistantMessage = data.response;
      
      setMessages([...newMessages, { role: "assistant", content: assistantMessage }]);

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

  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    if (profile?.language === "fr") return "Décris ta situation...";
    if (profile?.language === "de") return "Beschreibe deine Situation...";
    return "Describe your situation...";
  };

  const getWelcome = () => {
    if (profile?.full_name && lastSession) {
      const date = new Date(lastSession.conversation.created_at).toLocaleDateString(
        profile.language === "fr" ? "fr-FR" : profile.language === "de" ? "de-DE" : "en-US"
      );
      return profile.language === "fr" 
        ? `Bon retour ${profile.full_name} ! La dernière fois (${date}), on a travaillé ensemble. Tape "résumé" pour une synthèse, ou continue avec une nouvelle question.`
        : profile.language === "de"
        ? `Willkommen zurück ${profile.full_name}! Letztes Mal (${date}) haben wir zusammengearbeitet. Tippe "zusammenfassung" für eine Synthese, oder stelle eine neue Frage.`
        : `Welcome back ${profile.full_name}! Last time (${date}), we worked together. Type "summary" for a recap, or continue with a new question.`;
    }
    if (profile?.full_name && welcomeMessage) {
      return `Welcome back, ${profile.full_name}! ${welcomeMessage}`;
    }
    if (profile?.full_name) {
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
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-gray-900 text-white rounded-br-sm"
                  : "bg-gray-100 text-gray-800 rounded-bl-sm"
              }`}
            >
              {m.content}
            </div>
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
          {profile?.language === "fr" ? "Entrée pour envoyer · Shift+Entrée pour nouvelle ligne" : 
           profile?.language === "de" ? "Enter zum Senden · Shift+Enter für neue Zeile" :
           "Enter to send · Shift+Enter for new line"}
        </p>
      </div>
    </div>
  );
}

"use client";

import Chat from "@/components/Chat";
import Link from "next/link";
import { useState, useEffect } from "react";
import AuthStatus from "@/components/AuthStatus";
import { supabase } from "@/lib/supabase";

type Language = "fr" | "en" | "de";
type Mode = "both" | "consult" | "coach";

// Liste légère (id + titres) — le texte du livre reste côté serveur (agent), jamais dans le bundle client.
const CHAPTERS: { id: string; label: Record<Language, string> }[] = [
  { id: "forces", label: { fr: "Les forces", en: "Strengths", de: "Die Stärken" } },
  { id: "estime-de-soi", label: { fr: "L'estime de soi", en: "Self-esteem", de: "Selbstwert" } },
  { id: "art-oratoire", label: { fr: "L'art oratoire", en: "Public speaking", de: "Rhetorik" } },
  { id: "coaching", label: { fr: "Le coaching", en: "Coaching", de: "Coaching" } },
  { id: "leadership-situationnel", label: { fr: "Leadership situationnel", en: "Situational leadership", de: "Situatives Führen" } },
  { id: "feedback", label: { fr: "Le feedback", en: "Feedback", de: "Feedback" } },
  { id: "motivation", label: { fr: "La motivation", en: "Motivation", de: "Motivation" } },
  { id: "performance-equipe", label: { fr: "Performance d'équipe", en: "Team performance", de: "Teamleistung" } },
  { id: "co-developpement", label: { fr: "Le co-développement", en: "Co-development", de: "Co-Development" } },
  { id: "gestion-conflit", label: { fr: "Gestion de conflit", en: "Conflict management", de: "Konfliktmanagement" } },
  { id: "appreciative-inquiry", label: { fr: "Appreciative inquiry", en: "Appreciative inquiry", de: "Appreciative Inquiry" } },
  { id: "gerer-son-patron", label: { fr: "Gérer son patron", en: "Managing your boss", de: "Den Chef führen" } },
];

const t: Record<Language, {
  title: string; subtitle: string;
  modeBoth: string; modeConsult: string; modeCoach: string;
  chapterLabel: string; allBook: string;
  placeholder: string; welcome: string;
}> = {
  fr: {
    title: "Le manager-coach",
    subtitle: "Base de connaissances · le livre de C. & P. Kassenbeck",
    modeBoth: "Les deux",
    modeConsult: "Consulter",
    modeCoach: "Coaching",
    chapterLabel: "Chapitre (optionnel)",
    allBook: "Tout le livre",
    placeholder: "Pose une question sur le livre, ou décris ta situation...",
    welcome: "Je connais le livre « Le manager-coach » par cœur. Interroge-moi sur un concept (forces, feedback, motivation, conflit…) ou décris une situation à travailler — je t'aide avec les modèles du livre.",
  },
  en: {
    title: "The manager-coach",
    subtitle: "Knowledge base · the book by C. & P. Kassenbeck",
    modeBoth: "Both",
    modeConsult: "Consult",
    modeCoach: "Coaching",
    chapterLabel: "Chapter (optional)",
    allBook: "Whole book",
    placeholder: "Ask about the book, or describe your situation...",
    welcome: "I know the book “The manager-coach” inside out. Ask me about a concept (strengths, feedback, motivation, conflict…) or describe a situation to work on — I'll help using the book's models.",
  },
  de: {
    title: "Der Manager-Coach",
    subtitle: "Wissensbasis · das Buch von C. & P. Kassenbeck",
    modeBoth: "Beides",
    modeConsult: "Nachschlagen",
    modeCoach: "Coaching",
    chapterLabel: "Kapitel (optional)",
    allBook: "Ganzes Buch",
    placeholder: "Frag zum Buch oder beschreibe deine Situation...",
    welcome: "Ich kenne das Buch „Der Manager-Coach“ in- und auswendig. Frag mich zu einem Konzept (Stärken, Feedback, Motivation, Konflikt…) oder beschreibe eine Situation — ich helfe mit den Modellen des Buches.",
  },
};

export default function LibraryPage() {
  const [language, setLanguage] = useState<Language>("fr");
  const [mode, setMode] = useState<Mode>("both");
  const [chapter, setChapter] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function loadLanguage() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from("profiles").select("language").eq("id", user.id).single();
        if (data?.language && ["fr", "en", "de"].includes(data.language)) {
          setLanguage(data.language as Language);
        }
      }
    }
    loadLanguage();
  }, []);

  const tr = t[language];
  const modes: { id: Mode; label: string }[] = [
    { id: "both", label: tr.modeBoth },
    { id: "consult", label: tr.modeConsult },
    { id: "coach", label: tr.modeCoach },
  ];

  return (
    <main className="min-h-screen bg-white max-w-2xl mx-auto px-4">
      <div className="flex items-center justify-between py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-gray-300 hover:text-gray-600 transition-colors text-sm">←</Link>
          <div>
            <h1 className="font-medium text-gray-900 text-sm">{tr.title}</h1>
            <p className="text-xs text-gray-400">{tr.subtitle}</p>
          </div>
        </div>
        <AuthStatus />
      </div>

      {/* Mode */}
      <div className="py-4 border-b border-gray-50">
        <div className="flex items-center gap-1 border rounded-full px-1 py-1 w-fit" style={{ borderColor: "#E5DED3" }}>
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                mode === m.id ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chapitre */}
      <div className="py-4 border-b border-gray-50">
        <p className="text-xs text-gray-400 mb-2">{tr.chapterLabel}</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setChapter(undefined)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              chapter === undefined ? "bg-teal-600 text-white border-teal-600" : "border-gray-200 text-gray-500 hover:border-gray-400"
            }`}
          >
            {tr.allBook}
          </button>
          {CHAPTERS.map((c) => (
            <button
              key={c.id}
              onClick={() => setChapter(chapter === c.id ? undefined : c.id)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                chapter === c.id ? "bg-teal-600 text-white border-teal-600" : "border-gray-200 text-gray-500 hover:border-gray-400"
              }`}
            >
              {c.label[language]}
            </button>
          ))}
        </div>
      </div>

      <Chat
        key={`${mode}-${chapter ?? "all"}`}
        agentId="manager-coach-book"
        context={{ chapter, mode: mode === "both" ? undefined : mode, language }}
        placeholder={tr.placeholder}
        welcomeMessage={tr.welcome}
        language={language}
      />
    </main>
  );
}

"use client";

import Chat from "@/components/Chat";
import Link from "next/link";
import { useState, useEffect } from "react";
import AuthStatus from "@/components/AuthStatus";
import { supabase } from "@/lib/supabase";

type Step = "role" | "context" | "chat";

const translations = {
  fr: {
    title: "Leadership",
    subtitle: "Ton compagnon IA",
    roleQuestion: "Quel est ton rôle ?",
    roleHelp: "Ça m'aide à adapter mon accompagnement à ton contexte.",
    skip: "Passer — je t'explique en chemin →",
    contextQuestion: "Sur quoi veux-tu travailler ?",
    contextHelp: "Choisis un thème, ou passe et dis-moi directement.",
    profile: "Profil",
    roles: {
      manager: { label: "Manager", description: "Je manage une équipe" },
      leader: { label: "Leader", description: "Je manage aussi des managers" },
      executive: { label: "Executive", description: "Je fais partie de la direction" },
    },
    contexts: {
      feedback: "Donner du feedback",
      delegation: "Délégation",
      conflict: "Gérer les conflits",
      communication: "Communication & présence",
      team: "Dynamiques d'équipe",
      motivation: "Motivation & engagement",
      change: "Conduire le changement",
      personal: "Développement personnel",
      other: "Autre chose",
    },
    welcome: (role: string, context: string) => {
      if (role && context && context !== "other") {
        return `Bienvenue ! Tu m'as dit que tu es ${role} et que tu veux travailler sur ${context}. Raconte-moi ta situation — que se passe-t-il en ce moment ?`;
      } else if (role) {
        return `Bienvenue ! En tant que ${role}, quel défi ou situation voudrais-tu explorer aujourd'hui ?`;
      }
      return `Bienvenue ! Quel défi de leadership voudrais-tu explorer aujourd'hui ?`;
    },
    placeholder: "Décris ta situation ou pose une question...",
  },
  en: {
    title: "Leadership",
    subtitle: "Your AI-powered companion",
    roleQuestion: "What's your role?",
    roleHelp: "This helps me tailor my support to your context.",
    skip: "Skip — I'll explain as we go →",
    contextQuestion: "What would you like to work on?",
    contextHelp: "Pick a theme, or skip and tell me directly.",
    profile: "Profile",
    roles: {
      manager: { label: "Manager", description: "I manage a team" },
      leader: { label: "Leader", description: "I manage also managers" },
      executive: { label: "Executive", description: "I'm part of senior leadership" },
    },
    contexts: {
      feedback: "Giving feedback",
      delegation: "Delegation",
      conflict: "Handling conflict",
      communication: "Communication & presence",
      team: "Team dynamics",
      motivation: "Motivation & engagement",
      change: "Leading change",
      personal: "Personal development",
      other: "Something else",
    },
    welcome: (role: string, context: string) => {
      if (role && context && context !== "other") {
        return `Welcome! You mentioned you're a ${role} looking to work on ${context}. Tell me more about your situation — what's happening right now?`;
      } else if (role) {
        return `Welcome! As a ${role}, what challenge or situation would you like to explore today?`;
      }
      return `Welcome! What leadership challenge would you like to explore today?`;
    },
    placeholder: "Describe your situation or ask a question...",
  },
  de: {
    title: "Leadership",
    subtitle: "Dein KI-gestützter Begleiter",
    roleQuestion: "Was ist deine Rolle?",
    roleHelp: "Das hilft mir, meine Unterstützung an deinen Kontext anzupassen.",
    skip: "Überspringen — ich erkläre unterwegs →",
    contextQuestion: "Woran möchtest du arbeiten?",
    contextHelp: "Wähle ein Thema oder überspringe und erzähl mir direkt.",
    profile: "Profil",
    roles: {
      manager: { label: "Manager", description: "Ich führe ein Team" },
      leader: { label: "Leader", description: "Ich führe auch Manager" },
      executive: { label: "Executive", description: "Ich bin Teil der Geschäftsleitung" },
    },
    contexts: {
      feedback: "Feedback geben",
      delegation: "Delegation",
      conflict: "Konflikte bewältigen",
      communication: "Kommunikation & Präsenz",
      team: "Teamdynamik",
      motivation: "Motivation & Engagement",
      change: "Veränderung führen",
      personal: "Persönliche Entwicklung",
      other: "Etwas anderes",
    },
    welcome: (role: string, context: string) => {
      if (role && context && context !== "other") {
        return `Willkommen! Du hast gesagt, du bist ${role} und möchtest an ${context} arbeiten. Erzähl mir mehr — was passiert gerade?`;
      } else if (role) {
        return `Willkommen! Als ${role}, welche Herausforderung möchtest du heute erkunden?`;
      }
      return `Willkommen! Welche Leadership-Herausforderung möchtest du heute erkunden?`;
    },
    placeholder: "Beschreibe deine Situation oder stelle eine Frage...",
  },
};

const languages = [
  { id: "fr", flag: "🇫🇷" },
  { id: "en", flag: "🇬🇧" },
  { id: "de", flag: "🇩🇪" },
];

export default function LeadershipPage() {
  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<string | undefined>(undefined);
  const [context, setContext] = useState<string | undefined>(undefined);
  const [language, setLanguage] = useState<"fr" | "en" | "de">("fr");
  const [userId, setUserId] = useState<string | null>(null);

  const t = translations[language];

  useEffect(() => {
    loadUserLanguage();
  }, []);

  async function loadUserLanguage() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUserId(user.id);
      const { data } = await supabase
        .from("profiles")
        .select("language")
        .eq("id", user.id)
        .single();
      if (data?.language && (data.language === "fr" || data.language === "en" || data.language === "de")) {
        setLanguage(data.language);
      }
    }
  }

  async function changeLanguage(newLang: "fr" | "en" | "de") {
    setLanguage(newLang);
    if (userId) {
      await supabase
        .from("profiles")
        .update({ language: newLang, updated_at: new Date().toISOString() })
        .eq("id", userId);
    }
  }

  const selectRole = (roleId: string) => {
    setRole(roleId);
    setStep("context");
  };

  const selectContext = (contextId: string) => {
    setContext(contextId);
    setStep("chat");
  };

  const skipToChat = () => {
    setStep("chat");
  };

  const goBack = () => {
    if (step === "context") {
      setStep("role");
      setRole(undefined);
    } else if (step === "chat") {
      setStep("context");
      setContext(undefined);
    }
  };

  const roleKeys = ["manager", "leader", "executive"] as const;
  const contextKeys = ["feedback", "delegation", "conflict", "communication", "team", "motivation", "change", "personal", "other"] as const;

  const getWelcomeMessage = () => {
    const roleLabel = role ? t.roles[role as keyof typeof t.roles]?.label : "";
    const contextLabel = context ? t.contexts[context as keyof typeof t.contexts]?.toLowerCase() : "";
    return t.welcome(roleLabel, contextLabel);
  };

  return (
    <main className="min-h-screen bg-white max-w-2xl mx-auto px-4">
      {/* Header */}
      <div className="flex items-center justify-between py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          {step === "role" ? (
            <Link
              href="/"
              className="text-gray-300 hover:text-gray-600 transition-colors text-sm"
            >
              ←
            </Link>
          ) : (
            <button
              onClick={goBack}
              className="text-gray-300 hover:text-gray-600 transition-colors text-sm"
            >
              ←
            </button>
          )}
          <div>
            <h1 className="font-medium text-gray-900 text-sm">{t.title}</h1>
            <p className="text-xs text-gray-400">{t.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="flex items-center gap-1 border rounded-full px-1 py-1" style={{ borderColor: "#E5DED3" }}>
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => changeLanguage(lang.id as "fr" | "en" | "de")}
                className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${
                  language === lang.id
                    ? "bg-gray-900 text-white"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {lang.flag}
              </button>
            ))}
          </div>
          <Link href="/profile" className="text-sm hover:underline" style={{ color: "#A8956E" }}>
            {t.profile}
          </Link>
          <AuthStatus />
        </div>
      </div>

      {/* Step 1: Role selection */}
      {step === "role" && (
        <div className="py-8">
          <h2
            className="text-xl font-medium mb-2"
            style={{ color: "#2C2318", fontFamily: "Georgia, serif" }}
          >
            {t.roleQuestion}
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            {t.roleHelp}
          </p>

          <div className="space-y-3">
            {roleKeys.map((r) => (
              <button
                key={r}
                onClick={() => selectRole(r)}
                className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-gray-400 transition-all"
              >
                <div className="font-medium text-gray-900">{t.roles[r].label}</div>
                <div className="text-sm text-gray-400">{t.roles[r].description}</div>
              </button>
            ))}
          </div>

          <button
            onClick={skipToChat}
            className="mt-6 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            {t.skip}
          </button>
        </div>
      )}

      {/* Step 2: Context selection */}
      {step === "context" && (
        <div className="py-8">
          <h2
            className="text-xl font-medium mb-2"
            style={{ color: "#2C2318", fontFamily: "Georgia, serif" }}
          >
            {t.contextQuestion}
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            {t.contextHelp}
          </p>

          <div className="flex flex-wrap gap-2">
            {contextKeys.map((c) => (
              <button
                key={c}
                onClick={() => selectContext(c)}
                className="px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-all"
              >
                {t.contexts[c]}
              </button>
            ))}
          </div>

          <button
            onClick={skipToChat}
            className="mt-6 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            {t.skip}
          </button>
        </div>
      )}

      {/* Step 3: Chat */}
      {step === "chat" && (
        <Chat
          agentId="leadership"
          context={{ role, topic: context }}
          placeholder={t.placeholder}
          welcomeMessage={getWelcomeMessage()}
          language={language}
          />
      )}
    </main>
  );
}

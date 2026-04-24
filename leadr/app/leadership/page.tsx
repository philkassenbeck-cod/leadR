"use client";

import Chat from "@/components/Chat";
import Link from "next/link";
import { useState, useEffect } from "react";
import AuthStatus from "@/components/AuthStatus";
import { supabase } from "@/lib/supabase";

type Step = "role" | "context" | "chat";
type Language = "fr" | "en" | "de";

const translations = {
  fr: {
    subtitle: "Ton compagnon de coaching IA",
    roleTitle: "Quel est ton rôle ?",
    roleHelp: "Ça m'aide à adapter mon accompagnement à ton contexte.",
    contextTitle: "Sur quoi veux-tu travailler ?",
    contextHelp: "Choisis un thème, ou passe et dis-le-moi directement.",
    skip: "Passer — je t'expliquerai au fur et à mesure →",
    placeholder: "Décris ta situation ou pose une question...",
    welcomeWithBoth: (role: string, topic: string) =>
      `Bienvenue ! Tu m'as dit être ${role} et vouloir travailler sur ${topic}. Raconte-moi ta situation — qu'est-ce qui se passe en ce moment ?`,
    welcomeWithRole: (role: string) =>
      `Bienvenue ! En tant que ${role}, quel défi ou quelle situation aimerais-tu explorer aujourd'hui ?`,
    welcomeGeneric: "Bienvenue ! Quel défi de leadership aimerais-tu explorer aujourd'hui ?",
  },
  en: {
    subtitle: "Your AI-powered companion",
    roleTitle: "What's your role?",
    roleHelp: "This helps me tailor my support to your context.",
    contextTitle: "What would you like to work on?",
    contextHelp: "Pick a theme, or skip and tell me directly.",
    skip: "Skip — I'll explain as we go →",
    placeholder: "Describe your situation or ask a question...",
    welcomeWithBoth: (role: string, topic: string) =>
      `Welcome! You mentioned you're a ${role} looking to work on ${topic}. Tell me more about your situation — what's happening right now?`,
    welcomeWithRole: (role: string) =>
      `Welcome! As a ${role}, what challenge or situation would you like to explore today?`,
    welcomeGeneric: "Welcome! What leadership challenge would you like to explore today?",
  },
  de: {
    subtitle: "Dein KI-gestützter Begleiter",
    roleTitle: "Was ist deine Rolle?",
    roleHelp: "Das hilft mir, meine Unterstützung an deinen Kontext anzupassen.",
    contextTitle: "Woran möchtest du arbeiten?",
    contextHelp: "Wähle ein Thema oder überspringe und sag es mir direkt.",
    skip: "Überspringen — ich erkläre es unterwegs →",
    placeholder: "Beschreibe deine Situation oder stelle eine Frage...",
    welcomeWithBoth: (role: string, topic: string) =>
      `Willkommen! Du hast gesagt, dass du ${role} bist und an ${topic} arbeiten möchtest. Erzähl mir mehr über deine Situation — was passiert gerade?`,
    welcomeWithRole: (role: string) =>
      `Willkommen! Als ${role}, welche Herausforderung oder Situation möchtest du heute erkunden?`,
    welcomeGeneric: "Willkommen! Welche Führungsherausforderung möchtest du heute erkunden?",
  },
};

const rolesData = {
  fr: [
    { id: "manager", label: "Manager", description: "Je manage une équipe" },
    { id: "leader", label: "Leader", description: "Je manage aussi des managers" },
    { id: "executive", label: "Dirigeant", description: "Je fais partie de la direction" },
  ],
  en: [
    { id: "manager", label: "Manager", description: "I manage a team" },
    { id: "leader", label: "Leader", description: "I manage managers too" },
    { id: "executive", label: "Executive", description: "I'm part of senior leadership" },
  ],
  de: [
    { id: "manager", label: "Manager", description: "Ich führe ein Team" },
    { id: "leader", label: "Leader", description: "Ich führe auch Manager" },
    { id: "executive", label: "Führungskraft", description: "Ich bin Teil der obersten Führung" },
  ],
};
const contextsData = {
  fr: [
    { id: "feedback", label: "Donner du feedback" },
    { id: "delegation", label: "Déléguer" },
    { id: "conflict", label: "Gérer un conflit" },
    { id: "communication", label: "Communication & présence" },
    { id: "team", label: "Dynamique d'équipe" },
    { id: "motivation", label: "Motivation & engagement" },
    { id: "change", label: "Conduire le changement" },
    { id: "personal", label: "Développement personnel" },
    { id: "other", label: "Autre chose" },
  ],
  en: [
    { id: "feedback", label: "Giving feedback" },
    { id: "delegation", label: "Delegation" },
    { id: "conflict", label: "Handling conflict" },
    { id: "communication", label: "Communication & presence" },
    { id: "team", label: "Team dynamics" },
    { id: "motivation", label: "Motivation & engagement" },
    { id: "change", label: "Leading change" },
    { id: "personal", label: "Personal development" },
    { id: "other", label: "Something else" },
  ],
  de: [
    { id: "feedback", label: "Feedback geben" },
    { id: "delegation", label: "Delegieren" },
    { id: "conflict", label: "Konflikte meistern" },
    { id: "communication", label: "Kommunikation & Präsenz" },
    { id: "team", label: "Teamdynamik" },
    { id: "motivation", label: "Motivation & Engagement" },
    { id: "change", label: "Wandel führen" },
    { id: "personal", label: "Persönliche Entwicklung" },
    { id: "other", label: "Etwas anderes" },
  ],
};

export default function LeadershipPage() {
  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<string | undefined>(undefined);
  const [context, setContext] = useState<string | undefined>(undefined);
  const [language, setLanguage] = useState<Language>("en");
  const [profileLoaded, setProfileLoaded] = useState(false);

  // Load user language from profile
  useEffect(() => {
    async function loadLanguage() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("language")
          .eq("id", user.id)
          .single();
        if (data?.language && ["fr", "en", "de"].includes(data.language)) {
          setLanguage(data.language as Language);
        }
      }
      setProfileLoaded(true);
    }
    loadLanguage();
  }, []);

  const t = translations[language];
  const roles = rolesData[language];
  const contexts = contextsData[language];

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

  const getWelcomeMessage = () => {
    const roleLabel = roles.find((r) => r.id === role)?.label || "";
    const contextLabel = contexts.find((c) => c.id === context)?.label?.toLowerCase() || "";

    if (role && context && context !== "other") {
      return t.welcomeWithBoth(roleLabel, contextLabel);
    } else if (role) {
      return t.welcomeWithRole(roleLabel);
    }
    return t.welcomeGeneric;
  };

  // Don't render until profile language is loaded (avoids flash of English)
  if (!profileLoaded) {
    return (
      <main className="min-h-screen bg-white max-w-2xl mx-auto px-4 flex items-center justify-center">
        <div className="text-gray-300 text-sm">...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white max-w-2xl mx-auto px-4">
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
            <h1 className="font-medium text-gray-900 text-sm">Leadership</h1>
            <p className="text-xs text-gray-400">{t.subtitle}</p>
          </div>
        </div>
        <AuthStatus />
      </div>

      {step === "role" && (
        <div className="py-8">
          <h2
            className="text-xl font-medium mb-2"
            style={{ color: "#2C2318", fontFamily: "Georgia, serif" }}
          >
            {t.roleTitle}
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            {t.roleHelp}
          </p>

          <div className="space-y-3">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => selectRole(r.id)}
                className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-gray-400 transition-all"
              >
                <div className="font-medium text-gray-900">{r.label}</div>
                <div className="text-sm text-gray-400">{r.description}</div>
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

      {step === "context" && (
        <div className="py-8">
          <h2
            className="text-xl font-medium mb-2"
            style={{ color: "#2C2318", fontFamily: "Georgia, serif" }}
          >
            {t.contextTitle}
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            {t.contextHelp}
          </p>

          <div className="flex flex-wrap gap-2">
            {contexts.map((c) => (
              <button
                key={c.id}
                onClick={() => selectContext(c.id)}
                className="px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-all"
              >
                {c.label}
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

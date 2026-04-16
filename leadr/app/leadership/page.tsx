"use client";

import Chat from "@/components/Chat";
import Link from "next/link";
import { useState } from "react";
import AuthStatus from "@/components/AuthStatus";

type Step = "role" | "context" | "chat";

const roles = [
  { id: "manager", label: "Manager", description: "I manage a team" },
  { id: "leader", label: "Leader", description: "I lead without direct reports" },
  { id: "executive", label: "Executive", description: "I'm part of senior leadership" },
];

const contexts = [
  { id: "feedback", label: "Giving feedback" },
  { id: "delegation", label: "Delegation" },
  { id: "conflict", label: "Handling conflict" },
  { id: "communication", label: "Communication & presence" },
  { id: "team", label: "Team dynamics" },
  { id: "motivation", label: "Motivation & engagement" },
  { id: "change", label: "Leading change" },
  { id: "personal", label: "Personal development" },
  { id: "other", label: "Something else" },
];

export default function LeadershipPage() {
  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<string | undefined>(undefined);
  const [context, setContext] = useState<string | undefined>(undefined);

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
      return `Welcome! You mentioned you're a ${roleLabel} looking to work on ${contextLabel}. Tell me more about your situation — what's happening right now?`;
    } else if (role) {
      return `Welcome! As a ${roleLabel}, what challenge or situation would you like to explore today?`;
    }
    return `Welcome! What leadership challenge would you like to explore today?`;
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
            <h1 className="font-medium text-gray-900 text-sm">Leadership</h1>
            <p className="text-xs text-gray-400">Your AI-powered companion</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/profile" className="text-sm hover:underline" style={{ color: "#A8956E" }}>
            Profile
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
            What's your role?
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            This helps me tailor my support to your context.
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
            Skip — I'll explain as we go →
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
            What would you like to work on?
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Pick a theme, or skip and tell me directly.
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
            Skip — I'll explain as we go →
          </button>
        </div>
      )}

      {/* Step 3: Chat */}
      {step === "chat" && (
        <Chat
          agentId="leadership"
          context={{ role, topic: context }}
          placeholder="Describe your situation or ask a question..."
          welcomeMessage={getWelcomeMessage()}
        />
      )}
    </main>
  );
}

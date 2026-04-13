"use client";

import Chat from "@/components/Chat";
import Link from "next/link";
import { useState } from "react";

const modules = [
  { id: "manage-as-coach",        label: "Manager comme coach" },
  { id: "oratory",                label: "Art oratoire" },
  { id: "team-performance",       label: "Performance d'équipe" },
  { id: "conflict",               label: "Gestion des conflits" },
  { id: "appreciative-inquiry",   label: "Appreciative Inquiry" },
];

export default function SLPPage() {
  const [module, setModule] = useState<string | undefined>(undefined);

  return (
    <main className="min-h-screen bg-white max-w-2xl mx-auto px-4">
      <div className="flex items-center gap-3 py-5 border-b border-gray-100">
        <Link href="/" className="text-gray-300 hover:text-gray-600 transition-colors text-sm">←</Link>
        <div>
          <h1 className="font-medium text-gray-900 text-sm">Successful Leader Program</h1>
          <p className="text-xs text-gray-400">Formation leaders · Strengths-based</p>
        </div>
      </div>

      {/* Sélecteur de module */}
      <div className="py-4 border-b border-gray-50">
        <p className="text-xs text-gray-400 mb-2">Module (optionnel)</p>
        <div className="flex flex-wrap gap-2">
          {modules.map((m) => (
            <button
              key={m.id}
              onClick={() => setModule(module === m.id ? undefined : m.id)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                module === m.id
                  ? "bg-teal-600 text-white border-teal-600"
                  : "border-gray-200 text-gray-500 hover:border-gray-400"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <Chat
        key={module}
        agentId="slp"
        context={{ module }}
        placeholder="Pose ta question ou décris ta situation de leader..."
        welcomeMessage="Quel défi de leadership tu veux explorer ? Sélectionne un module ci-dessus ou commence directement."
      />
    </main>
  );
}

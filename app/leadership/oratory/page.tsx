import Chat from "@/components/Chat";
import Link from "next/link";

export default function OratoryPage() {
  return (
    <main className="min-h-screen bg-white max-w-2xl mx-auto px-4">
      <div className="flex items-center gap-3 py-5 border-b border-gray-100">
        <Link href="/" className="text-gray-300 hover:text-gray-600 transition-colors text-sm">←</Link>
        <div>
          <h1 className="font-medium text-gray-900 text-sm">Oratory Art & Impact</h1>
          <p className="text-xs text-gray-400">Prise de parole authentique · Ancré dans vos forces</p>
        </div>
      </div>
      <Chat
        agentId="oratory"
        placeholder="Décris ta prochaine prise de parole ou ton défi..."
        welcomeMessage="Quelle est ta prochaine prise de parole ? Ou quel aspect de ton impact oratoire tu veux développer ? Partage aussi ton top 5 si tu l'as."
      />
    </main>
  );
}

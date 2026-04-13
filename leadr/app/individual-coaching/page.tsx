import Chat from "@/components/Chat";
import Link from "next/link";

export default function IndividualCoachingPage() {
  return (
    <main className="min-h-screen bg-white max-w-2xl mx-auto px-4">
      <div className="flex items-center gap-3 py-5 border-b border-gray-100">
        <Link href="/" className="text-gray-300 hover:text-gray-600 transition-colors text-sm">←</Link>
        <div>
          <h1 className="font-medium text-gray-900 text-sm">Coaching Individuel</h1>
          <p className="text-xs text-gray-400">Portrait de forces · Développement · Questions puissantes</p>
        </div>
      </div>
      <Chat
        agentId="individual-coaching"
        placeholder="Partage ton profil ou ta situation..."
        welcomeMessage="Partage ton top 5 de forces (ou top 10 si tu l'as) et ce sur quoi tu veux travailler. On commence de là."
      />
    </main>
  );
}

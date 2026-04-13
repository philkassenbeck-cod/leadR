import Chat from "@/components/Chat";
import Link from "next/link";

export default function TeamCoachingPage() {
  return (
    <main className="min-h-screen bg-white max-w-2xl mx-auto px-4">
      <div className="flex items-center gap-3 py-5 border-b border-gray-100">
        <Link href="/" className="text-gray-300 hover:text-gray-600 transition-colors text-sm">←</Link>
        <div>
          <h1 className="font-medium text-gray-900 text-sm">Team Coaching</h1>
          <p className="text-xs text-gray-400">Forces collectives · Angles morts · Dynamiques</p>
        </div>
      </div>
      <Chat
        agentId="team-coaching"
        placeholder="Décris ton équipe ou pose ta question..."
        welcomeMessage="Partage la composition de ton équipe (prénoms + top 5 de forces si tu les as) ou commence directement par ta question."
      />
    </main>
  );
}

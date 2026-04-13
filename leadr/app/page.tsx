import Link from "next/link";

const agents = [
  {
    id: "team-coaching",
    label: "Team Coaching",
    description: "Cartographie des forces collectives, angles morts, dynamiques d'équipe.",
    href: "/team-coaching",
    color: "bg-violet-50 border-violet-200 hover:border-violet-400",
    icon: "◎",
  },
  {
    id: "smp",
    label: "Successful Manager Program",
    description: "Délégation, feedback, motivation, conduite du changement — par les forces.",
    href: "/leadership/smp",
    color: "bg-teal-50 border-teal-200 hover:border-teal-400",
    icon: "▲",
  },
  {
    id: "slp",
    label: "Successful Leader Program",
    description: "Leader-coach, art oratoire, Appreciative Inquiry, gestion des conflits.",
    href: "/leadership/slp",
    color: "bg-teal-50 border-teal-200 hover:border-teal-400",
    icon: "◆",
  },
  {
    id: "oratory",
    label: "Oratory Art & Impact",
    description: "Prise de parole authentique et à impact — ancré dans votre profil de forces.",
    href: "/leadership/oratory",
    color: "bg-orange-50 border-orange-200 hover:border-orange-400",
    icon: "◉",
  },
  {
    id: "individual-coaching",
    label: "Coaching Individuel",
    description: "Portrait de forces, hypothèses de développement, questions puissantes.",
    href: "/individual-coaching",
    color: "bg-rose-50 border-rose-200 hover:border-rose-400",
    icon: "●",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 max-w-2xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-medium text-gray-900 mb-2">LeadR</h1>
        <p className="text-gray-500 text-lg">Plateforme de coaching strengths-based</p>
      </div>
      <div className="space-y-3">
        {agents.map((agent) => (
          <Link key={agent.id} href={agent.href}
            className={`block border rounded-xl p-5 transition-all duration-150 ${agent.color}`}>
            <div className="flex items-start gap-4">
              <span className="text-2xl mt-0.5">{agent.icon}</span>
              <div>
                <div className="font-medium text-gray-900 mb-1">{agent.label}</div>
                <div className="text-sm text-gray-500">{agent.description}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <p className="mt-12 text-xs text-gray-300 text-center">LeadR · Strengths-based · FR / EN / DE</p>
    </main>
  );
}

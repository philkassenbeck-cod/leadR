itypescriptimport Link from "next/link";

const agents = [
  {
    id: "team-coaching",
    label: "Team Coaching",
    description: "Cartographie des forces collectives, angles morts, dynamiques d'équipe.",
    href: "/team-coaching",
    color: "bg-amber-50 border-amber-200 hover:border-amber-400",
    icon: "◎",
  },
  {
    id: "smp",
    label: "Successful Manager Program",
    description: "Délégation, feedback, motivation, conduite du changement — par les forces.",
    href: "/leadership/smp",
    color: "bg-emerald-50 border-emerald-200 hover:border-emerald-400",
    icon: "▲",
  },
  {
    id: "slp",
    label: "Successful Leader Program",
    description: "Leader-coach, art oratoire, Appreciative Inquiry, gestion des conflits.",
    href: "/leadership/slp",
    color: "bg-sky-50 border-sky-200 hover:border-sky-400",
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
    color: "bg-purple-50 border-purple-200 hover:border-purple-400",
    icon: "●",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-16 max-w-2xl mx-auto" style={{background: "#FAF7F2"}}>
      <div className="mb-12">
        <h1 className="text-3xl font-medium mb-1" style={{color: "#2C2318", fontFamily: "Georgia, serif"}}>LeadR</h1>
        <p className="text-sm tracking-widest uppercase" style={{color: "#A8956E"}}>Strengths-based coaching</p>
      </div>
      <div className="mb-6">
        <p className="text-xs tracking-widest uppercase" style={{color: "#C9A96E"}}>Choisir un espace</p>
      </div>
      <div className="space-y-3">
        {agents.map((agent) => (
          <Link key={agent.id} href={agent.href}
            className={`block border rounded-xl p-5 transition-all duration-150 ${agent.color}`}>
            <div className="flex items-center gap-4">
              <span className="text-xl" style={{color: "#C9A96E"}}>{agent.icon}</span>
              <div className="flex-1">
                <div className="font-medium mb-1" style={{color: "#2C2318"}}>{agent.label}</div>
                <div className="text-sm" style={{color: "#A8956E"}}>{agent.description}</div>
              </div>
              <span style={{color: "#C9A96E", fontSize: "20px"}}>›</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-12 pt-6" style={{borderTop: "1px solid #E0D8C8"}}>
        <p className="text-xs text-center tracking-widest" style={{color: "#C9A96E"}}>FR · EN · DE &nbsp;·&nbsp; OPTIMUP © 2026</p>
      </div>
    </main>
  );
}

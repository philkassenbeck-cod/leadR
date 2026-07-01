# LeadR — Plateforme de coaching strengths-based

Agent IA de coaching basé sur la méthode Gallup StrengthsFinder. Trilingue : FR / EN / DE.

## Agents disponibles

| Agent | Description |
|---|---|
| **Team Coaching** | Cartographie collective, angles morts, dynamiques |
| **SMP** | Successful Manager Program — délégation, feedback, motivation, changement |
| **SLP** | Successful Leader Program — leader-coach, art oratoire, conflits, AI |
| **Oratory Art** | Prise de parole authentique, ancré dans les forces |
| **Coaching Individuel** | Portrait de forces, développement, questions puissantes |
| **Le manager-coach** (`/library`) | Base de connaissances consultable + coach, à partir du livre « Le manager-coach » (12 chapitres) |

## Stack

- Next.js 15 · TypeScript · Tailwind CSS · Anthropic API · Vercel

## Installation

```bash
npm install
cp .env.example .env.local
# Ajouter ANTHROPIC_API_KEY dans .env.local
npm run dev
```

## Déploiement Vercel

1. Connecter le repo GitHub à Vercel
2. **Root Directory = `./`** (l'app Next est à la racine du repo)
3. Ajouter les variables : `ANTHROPIC_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

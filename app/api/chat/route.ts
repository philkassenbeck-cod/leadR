import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";
import { buildTeamCoachingPrompt } from "@/agents/team-coaching";
import { buildIndividualCoachingPrompt } from "@/agents/individual-coaching";
import { buildSMPPrompt } from "@/agents/smp";
import { buildSLPPrompt } from "@/agents/slp";
import { buildOratoryPrompt } from "@/agents/oratory";
import { buildLeadershipPrompt } from "@/agents/leadership";
import { buildManagerCoachBookPrompt } from "@/agents/manager-coach-book";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Plafond de messages/jour par utilisateur (anti-« aspirateur » de contenu).
const DAILY_MESSAGE_LIMIT = 80;

type AgentId = "team-coaching" | "individual-coaching" | "smp" | "slp" | "oratory" | "leadership" | "manager-coach-book";

function getSystemPrompt(agentId: AgentId, context: Record<string, unknown>): string {
  switch (agentId) {
    case "team-coaching":
      return buildTeamCoachingPrompt(context as Parameters<typeof buildTeamCoachingPrompt>[0]);
    case "individual-coaching":
      return buildIndividualCoachingPrompt(context as Parameters<typeof buildIndividualCoachingPrompt>[0]);
    case "smp":
      return buildSMPPrompt(context as Parameters<typeof buildSMPPrompt>[0]);
    case "slp":
      return buildSLPPrompt(context as Parameters<typeof buildSLPPrompt>[0]);
    case "oratory":
      return buildOratoryPrompt(context as Parameters<typeof buildOratoryPrompt>[0]);
    case "leadership":
      return buildLeadershipPrompt(context as Parameters<typeof buildLeadershipPrompt>[0]);
    case "manager-coach-book":
      return buildManagerCoachBookPrompt(context as Parameters<typeof buildManagerCoachBookPrompt>[0]);
    default:
      return buildLeadershipPrompt();
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, agentId = "individual-coaching", context = {} } = body;
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "messages requis" }, { status: 400 });
    }

    // Accès réservé aux utilisateurs connectés (invités) — le livre est inédit, pas d'accès anonyme.
    const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
    if (!token) {
      return NextResponse.json({ error: "auth_required" }, { status: 401 });
    }
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { global: { headers: { Authorization: `Bearer ${token}` } }, auth: { persistSession: false } },
    );
    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userData?.user) {
      return NextResponse.json({ error: "auth_required" }, { status: 401 });
    }

    // Limite d'usage anti-« aspirateur » : plafond quotidien par utilisateur.
    // Échoue en mode « ouvert » si la fonction SQL n'existe pas encore (l'auth protège déjà).
    const { data: allowed, error: rlErr } = await supabase.rpc("record_chat_usage", {
      p_limit: DAILY_MESSAGE_LIMIT,
    });
    if (!rlErr && allowed === false) {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }

    const systemPrompt = getSystemPrompt(agentId as AgentId, context);

    // Streaming : on renvoie la réponse au fur et à mesure qu'elle se génère
    // (affichage progressif côté client → ressenti bien plus rapide).
    const anthropicStream = anthropic.messages.stream({
      // claude-sonnet-4-20250514 a été retiré le 15/06/2026 → remplacé par Sonnet 5.
      model: "claude-sonnet-5",
      // 1500 tronquait les réponses longues (débrief en 5 parties + questions).
      max_tokens: 4000,
      // Sonnet 5 active la réflexion adaptive par défaut, qui consommerait le budget
      // max_tokens ; on la désactive pour garder des réponses de chat rapides et complètes.
      thinking: { type: "disabled" },
      // Prompt caching : le system prompt (volumineux pour les agents à base de
      // connaissances) est mis en cache par Anthropic ~5 min. Les tours suivants
      // d'une même conversation réutilisent le cache → coût d'entrée fortement réduit.
      system: [{ type: "text", text: systemPrompt, cache_control: { type: "ephemeral" } }],
      messages,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const event of anthropicStream) {
            if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

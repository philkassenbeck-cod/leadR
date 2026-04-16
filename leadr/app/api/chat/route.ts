typescriptimport { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildTeamCoachingPrompt } from "@/agents/team-coaching";
import { buildIndividualCoachingPrompt } from "@/agents/individual-coaching";
import { buildSMPPrompt } from "@/agents/smp";
import { buildSLPPrompt } from "@/agents/slp";
import { buildOratoryPrompt } from "@/agents/oratory";
import { buildLeadershipPrompt } from "@/agents/leadership";  // ← AJOUTER

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

type AgentId = "team-coaching" | "individual-coaching" | "smp" | "slp" | "oratory" | "leadership";  // ← AJOUTER "leadership"

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
    case "leadership":  // ← AJOUTER CE CASE
      return buildLeadershipPrompt(context as Parameters<typeof buildLeadershipPrompt>[0]);
    default:
      return buildLeadershipPrompt();  // ← CHANGER LE DEFAULT
  }
}

export async function POST(req: NextRequest) {
  // ... reste inchangé
}

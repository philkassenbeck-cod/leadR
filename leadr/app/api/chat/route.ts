import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildTeamCoachingPrompt } from "@/agents/team-coaching";
import { buildIndividualCoachingPrompt } from "@/agents/individual-coaching";
import { buildSMPPrompt } from "@/agents/smp";
import { buildSLPPrompt } from "@/agents/slp";
import { buildOratoryPrompt } from "@/agents/oratory";
import { buildLeadershipPrompt } from "@/agents/leadership";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

type AgentId = "team-coaching" | "individual-coaching" | "smp" | "slp" | "oratory" | "leadership";

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
    const systemPrompt = getSystemPrompt(agentId as AgentId, context);
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      system: systemPrompt,
      messages,
    });
    const text = response.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");
    return NextResponse.json({ response: text });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

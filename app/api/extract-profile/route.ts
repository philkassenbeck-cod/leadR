import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { TALENTS } from "@/knowledge/talents";

export const runtime = "nodejs";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// 34 noms canoniques en tiret (aligné sur l'UI /profile, le `top5` stocké et l'agent).
// La clé du KB est `Self_Assurance` (underscore) → on la convertit en `Self-Assurance`.
const CANONICAL_TALENTS = Object.keys(TALENTS).map((k) => k.replace(/_/g, "-"));
const DISC_LETTERS = ["D", "I", "S", "C"] as const;
const INSIGHTS_COLORS = ["red", "yellow", "green", "blue"] as const;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

type Kind = "strengths" | "disc" | "insights";

const recordProfileTool: Anthropic.Tool = {
  name: "record_profile",
  description:
    "Enregistre les données lues dans le rapport. Ne remplis QUE les champs que tu peux lire avec certitude ; laisse le reste vide.",
  input_schema: {
    type: "object",
    properties: {
      top10: {
        type: "array",
        items: { type: "string", enum: CANONICAL_TALENTS },
        maxItems: 10,
        description:
          "Les thèmes CliftonStrengths dans l'ordre exact du rapport (thème n°1 en premier), jusqu'à 10. Utilise EXACTEMENT les noms fournis dans l'enum.",
      },
      disc: {
        type: "object",
        properties: {
          primary: { type: "string", enum: DISC_LETTERS },
          secondary: { type: "string", enum: DISC_LETTERS },
        },
        description: "Profil DISC : lettre dominante (primary) et secondaire.",
      },
      insights: {
        type: "object",
        properties: {
          primary: { type: "string", enum: INSIGHTS_COLORS },
          secondary: { type: "string", enum: INSIGHTS_COLORS },
        },
        description:
          "Insights Discovery : couleur dominante (primary) et secondaire. Fiery Red=red, Sunshine Yellow=yellow, Earth Green=green, Cool Blue=blue.",
      },
    },
  },
};

function instructionFor(kind: Kind): string {
  const base =
    "Tu reçois un rapport de profil (PDF ou image). Extrais uniquement ce qui est réellement présent et lisible, puis appelle l'outil record_profile.";
  if (kind === "strengths")
    return `${base} Ce rapport est un rapport CliftonStrengths / StrengthsFinder de Gallup : renvoie top10 (les thèmes dans l'ordre du rapport).`;
  if (kind === "disc")
    return `${base} Ce rapport est un profil DISC : renvoie disc (primary/secondary parmi D, I, S, C).`;
  return `${base} Ce rapport est un profil Insights Discovery (4 couleurs) : renvoie insights (primary/secondary parmi red, yellow, green, blue).`;
}

type Extracted = {
  top5?: string[];
  top10?: string[];
  disc?: { primary: string; secondary: string | null };
  insights?: { primary: string; secondary: string | null };
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const kind = body?.kind as Kind;
    const mediaType = body?.mediaType as string;
    const data = body?.data as string;

    if (!data || typeof data !== "string") return NextResponse.json({});
    // base64 ~ +33% : ~8 Mo base64 ≈ ~6 Mo de fichier
    if (data.length > 8_000_000) return NextResponse.json({ error: "file_too_large" });

    const isPdf = mediaType === "application/pdf";
    const isImage = IMAGE_TYPES.includes(mediaType);
    if (!isPdf && !isImage) return NextResponse.json({});

    const fileBlock: Anthropic.ContentBlockParam = isPdf
      ? { type: "document", source: { type: "base64", media_type: "application/pdf", data } }
      : {
          type: "image",
          source: {
            type: "base64",
            media_type: mediaType as Anthropic.Base64ImageSource["media_type"],
            data,
          },
        };

    const response = await anthropic.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 1024,
      thinking: { type: "disabled" },
      tools: [recordProfileTool],
      tool_choice: { type: "tool", name: "record_profile", disable_parallel_tool_use: true },
      messages: [
        { role: "user", content: [fileBlock, { type: "text", text: instructionFor(kind) }] },
      ],
    });

    const toolBlock = response.content.find((b) => b.type === "tool_use");
    const raw = (toolBlock && "input" in toolBlock ? toolBlock.input : {}) as Record<string, unknown>;

    const out: Extracted = {};

    // top10 → filtré aux noms canoniques, dédupliqué, plafonné à 10 ; top5 = 5 premiers
    if (Array.isArray(raw.top10)) {
      const top10 = [
        ...new Set(
          raw.top10.filter(
            (t): t is string => typeof t === "string" && CANONICAL_TALENTS.includes(t),
          ),
        ),
      ].slice(0, 10);
      if (top10.length) {
        out.top10 = top10;
        out.top5 = top10.slice(0, 5);
      }
    }

    // disc
    const disc = raw.disc as { primary?: unknown; secondary?: unknown } | undefined;
    if (disc && typeof disc.primary === "string" && (DISC_LETTERS as readonly string[]).includes(disc.primary)) {
      out.disc = {
        primary: disc.primary,
        secondary:
          typeof disc.secondary === "string" &&
          (DISC_LETTERS as readonly string[]).includes(disc.secondary) &&
          disc.secondary !== disc.primary
            ? disc.secondary
            : null,
      };
    }

    // insights
    const ins = raw.insights as { primary?: unknown; secondary?: unknown } | undefined;
    if (ins && typeof ins.primary === "string" && (INSIGHTS_COLORS as readonly string[]).includes(ins.primary)) {
      out.insights = {
        primary: ins.primary,
        secondary:
          typeof ins.secondary === "string" &&
          (INSIGHTS_COLORS as readonly string[]).includes(ins.secondary) &&
          ins.secondary !== ins.primary
            ? ins.secondary
            : null,
      };
    }

    return NextResponse.json(out);
  } catch (err) {
    console.error("extract-profile error:", err);
    // best-effort : jamais de 500 → le client garde la saisie manuelle
    return NextResponse.json({});
  }
}

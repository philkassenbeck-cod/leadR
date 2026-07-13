import { NextRequest } from "next/server";
import { stripMarkdown } from "@/lib/stripMarkdown";

export const runtime = "nodejs";

// Voix par défaut (fallback) — remplace-la via ELEVENLABS_VOICE_ID par une voix FR/multilingue de ton compte.
const DEFAULT_VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // "Rachel" (fonctionne aussi en multilingue)
// turbo = latence bien plus faible, français toujours bon (au lieu de multilingual_v2 plus lent)
const MODEL_ID = "eleven_turbo_v2_5";
const MAX_CHARS = 5000;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      console.error("TTS: ELEVENLABS_API_KEY manquante");
      return new Response("missing_key", { status: 500 });
    }
    const key: string = apiKey;

    const body = await req.json();
    const raw = typeof body?.text === "string" ? body.text : "";
    const text = stripMarkdown(raw).slice(0, MAX_CHARS).trim();
    if (!text) return new Response("empty_text", { status: 400 });

    const configuredVoice = process.env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID;

    const tts = (voiceId: string) =>
      fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
        method: "POST",
        headers: { "xi-api-key": key, "Content-Type": "application/json", Accept: "audio/mpeg" },
        body: JSON.stringify({
          text,
          model_id: MODEL_ID,
          voice_settings: { stability: 0.5, similarity_boost: 0.75 },
        }),
      });

    let res = await tts(configuredVoice);
    // Free tier ElevenLabs : les voix de la Voice Library sont bloquées (402) →
    // repli automatique sur une voix premade (utilisable en gratuit via l'API).
    if (res.status === 402 && configuredVoice !== DEFAULT_VOICE_ID) {
      console.warn("TTS: voix bloquée (402), repli sur la voix premade par défaut");
      res = await tts(DEFAULT_VOICE_ID);
    }

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("ElevenLabs error:", res.status, detail.slice(0, 300));
      return Response.json(
        { error: "tts_error", elevenlabs_status: res.status, detail: detail.slice(0, 300) },
        { status: 502 },
      );
    }

    const audio = await res.arrayBuffer();
    return new Response(audio, {
      headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("TTS route error:", err);
    return new Response("error", { status: 500 });
  }
}

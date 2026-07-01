"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const TALENTS = [
  "Achiever", "Activator", "Adaptability", "Analytical", "Arranger",
  "Belief", "Command", "Communication", "Competition", "Connectedness",
  "Consistency", "Context", "Deliberative", "Developer", "Discipline",
  "Empathy", "Focus", "Futuristic", "Harmony", "Ideation",
  "Includer", "Individualization", "Input", "Intellection", "Learner",
  "Maximizer", "Positivity", "Relator", "Responsibility", "Restorative",
  "Self-Assurance", "Significance", "Strategic", "Woo"
];

const DISC_STYLES = [
  { id: "D", label: "Dominance", color: "#DC2626", textColor: "#FFFFFF" },
  { id: "I", label: "Influence", color: "#FBBF24", textColor: "#000000" },
  { id: "S", label: "Steadiness", color: "#16A34A", textColor: "#FFFFFF" },
  { id: "C", label: "Conscientiousness", color: "#2563EB", textColor: "#FFFFFF" },
];

const INSIGHTS_STYLES = [
  { id: "red", label: "Fiery Red", color: "#DC2626", textColor: "#FFFFFF" },
  { id: "yellow", label: "Sunshine Yellow", color: "#FBBF24", textColor: "#000000" },
  { id: "green", label: "Earth Green", color: "#16A34A", textColor: "#FFFFFF" },
  { id: "blue", label: "Cool Blue", color: "#2563EB", textColor: "#FFFFFF" },
];

const translations = {
  fr: {
    title: "Ton Profil",
    back: "← Retour",
    fullName: "Nom complet",
    fullNamePlaceholder: "Ton nom",
    bio: "Qui suis-je ?",
    bioHelp: "Quelques lignes sur toi — tes valeurs, ce qui te motive, comment tu te vois en tant que leader.",
    bioPlaceholder: "Je suis quelqu'un qui...",
    language: "Langue préférée",
    strengths: "CliftonStrengths Top 5",
    strengthsUpload: "Ou télécharge ton rapport complet :",
    uploadButton: "Télécharger PDF/Image",
    uploading: "Téléchargement...",
    viewFile: "Voir le fichier",
    disc: "Profil DISC (optionnel)",
    discHelp: "Clique pour sélectionner primaire, clique à nouveau pour secondaire :",
    discUpload: "Ou télécharge ton rapport DISC :",
    insights: "Profil Insights Discovery (optionnel)",
    insightsHelp: "Clique pour sélectionner la couleur primaire, clique à nouveau pour secondaire :",
    insightsUpload: "Ou télécharge ton rapport Insights :",
    extracting: "Analyse du rapport…",
    prefilled: "Pré-rempli depuis ton rapport — tu peux corriger.",
    save: "Enregistrer le profil",
    saving: "Enregistrement...",
    saved: "Profil enregistré !",
    error: "Erreur lors de l'enregistrement",
    loading: "Chargement...",
  },
  en: {
    title: "Your Profile",
    back: "← Back",
    fullName: "Full Name",
    fullNamePlaceholder: "Your name",
    bio: "Who do I think I am?",
    bioHelp: "A few lines about yourself — your values, what drives you, how you see yourself as a leader.",
    bioPlaceholder: "I am someone who...",
    language: "Preferred Language",
    strengths: "CliftonStrengths Top 5",
    strengthsUpload: "Or upload your full report:",
    uploadButton: "Upload PDF/Image",
    uploading: "Uploading...",
    viewFile: "View uploaded file",
    disc: "DISC Profile (optional)",
    discHelp: "Click to select primary, click again for secondary:",
    discUpload: "Or upload your DISC report:",
    insights: "Insights Discovery Profile (optional)",
    insightsHelp: "Click to select primary colour, click again for secondary:",
    insightsUpload: "Or upload your Insights report:",
    extracting: "Analyzing report…",
    prefilled: "Pre-filled from your report — you can edit.",
    save: "Save Profile",
    saving: "Saving...",
    saved: "Profile saved!",
    error: "Error saving profile",
    loading: "Loading...",
  },
  de: {
    title: "Dein Profil",
    back: "← Zurück",
    fullName: "Vollständiger Name",
    fullNamePlaceholder: "Dein Name",
    bio: "Wer bin ich?",
    bioHelp: "Ein paar Zeilen über dich — deine Werte, was dich antreibt, wie du dich als Führungskraft siehst.",
    bioPlaceholder: "Ich bin jemand, der...",
    language: "Bevorzugte Sprache",
    strengths: "CliftonStrengths Top 5",
    strengthsUpload: "Oder lade deinen vollständigen Bericht hoch:",
    uploadButton: "PDF/Bild hochladen",
    uploading: "Wird hochgeladen...",
    viewFile: "Datei ansehen",
    disc: "DISC-Profil (optional)",
    discHelp: "Klicke für primär, erneut klicken für sekundär:",
    discUpload: "Oder lade deinen DISC-Bericht hoch:",
    insights: "Insights Discovery Profil (optional)",
    insightsHelp: "Klicke für die primäre Farbe, erneut klicken für sekundär:",
    insightsUpload: "Oder lade deinen Insights-Bericht hoch:",
    extracting: "Bericht wird analysiert…",
    prefilled: "Aus deinem Bericht vorausgefüllt — du kannst korrigieren.",
    save: "Profil speichern",
    saving: "Speichern...",
    saved: "Profil gespeichert!",
    error: "Fehler beim Speichern",
    loading: "Laden...",
  },
};

const languages = [
  { id: "fr", label: "Français", flag: "🇫🇷" },
  { id: "en", label: "English", flag: "🇬🇧" },
  { id: "de", label: "Deutsch", flag: "🇩🇪" },
];

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [top5, setTop5] = useState<string[]>([]);
  const [top10, setTop10] = useState<string[]>([]);
  const [language, setLanguage] = useState<"fr" | "en" | "de">("fr");

  const [discPrimary, setDiscPrimary] = useState<string | null>(null);
  const [discSecondary, setDiscSecondary] = useState<string | null>(null);
  const [discFileUrl, setDiscFileUrl] = useState<string | null>(null);
  const [strengthsFileUrl, setStrengthsFileUrl] = useState<string | null>(null);

  const [insightsPrimary, setInsightsPrimary] = useState<string | null>(null);
  const [insightsSecondary, setInsightsSecondary] = useState<string | null>(null);
  const [insightsFileUrl, setInsightsFileUrl] = useState<string | null>(null);

  const [extracting, setExtracting] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const t = translations[language];

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }
    setUserId(user.id);

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setFullName(data.full_name || "");
      setBio(data.bio || "");
      setTop5(data.top5 || []);
      setTop10(data.top10 || []);
      if (data.language === "fr" || data.language === "en" || data.language === "de") {
        setLanguage(data.language);
      }
      setDiscPrimary(data.disc_primary || null);
      setDiscSecondary(data.disc_secondary || null);
      setDiscFileUrl(data.disc_file_url || null);
      setStrengthsFileUrl(data.strengths_file_url || null);
      setInsightsPrimary(data.insights_primary || null);
      setInsightsSecondary(data.insights_secondary || null);
      setInsightsFileUrl(data.insights_file_url || null);
    }
    setLoading(false);
  }

  function readBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(",")[1] ?? "");
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function uploadFile(file: File, type: "disc" | "strengths" | "insights") {
    if (!userId) return;
    setUploading(type);

    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}/${type}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("profiles")
      .upload(fileName, file);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      setMessage(t.error);
      setUploading(null);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("profiles")
      .getPublicUrl(fileName);

    if (type === "disc") setDiscFileUrl(publicUrl);
    if (type === "strengths") setStrengthsFileUrl(publicUrl);
    if (type === "insights") setInsightsFileUrl(publicUrl);

    setUploading(null);

    // Extraction automatique (best-effort) : pré-remplit sans jamais écraser avec du vide
    setExtracting(type);
    try {
      const base64 = await readBase64(file);
      const res = await fetch("/api/extract-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: type, mediaType: file.type, data: base64 }),
      });
      const extracted = await res.json();
      let prefilled = false;

      if (type === "strengths") {
        if (Array.isArray(extracted.top10) && extracted.top10.length) {
          setTop10(extracted.top10);
          prefilled = true;
        }
        if (Array.isArray(extracted.top5) && extracted.top5.length) {
          setTop5(extracted.top5);
          prefilled = true;
        }
      } else if (type === "disc" && extracted.disc?.primary) {
        setDiscPrimary(extracted.disc.primary);
        setDiscSecondary(extracted.disc.secondary ?? null);
        prefilled = true;
      } else if (type === "insights" && extracted.insights?.primary) {
        setInsightsPrimary(extracted.insights.primary);
        setInsightsSecondary(extracted.insights.secondary ?? null);
        prefilled = true;
      }

      setMessage(prefilled ? t.prefilled : t.saved);
    } catch (err) {
      console.error("Extraction error:", err);
      setMessage(t.saved); // le fichier est stocké ; la saisie manuelle reste possible
    } finally {
      setExtracting(null);
    }
  }

  async function saveProfile() {
    setSaving(true);
    setMessage("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        bio,
        top5,
        top10,
        language,
        disc_primary: discPrimary,
        disc_secondary: discSecondary,
        disc_file_url: discFileUrl,
        strengths_file_url: strengthsFileUrl,
        insights_primary: insightsPrimary,
        insights_secondary: insightsSecondary,
        insights_file_url: insightsFileUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) {
      setMessage(t.error);
      console.error(error);
    } else {
      setMessage(t.saved);
    }
    setSaving(false);
  }

  function toggleTalent(talent: string) {
    if (top5.includes(talent)) {
      setTop5(top5.filter(item => item !== talent));
    } else if (top5.length < 5) {
      setTop5([...top5, talent]);
    }
  }

  function selectDisc(id: string) {
    if (discPrimary === id) {
      setDiscPrimary(null);
    } else if (discSecondary === id) {
      setDiscSecondary(null);
    } else if (!discPrimary) {
      setDiscPrimary(id);
    } else if (!discSecondary && discPrimary !== id) {
      setDiscSecondary(id);
    } else {
      setDiscPrimary(id);
      setDiscSecondary(null);
    }
  }

  function selectInsights(id: string) {
    if (insightsPrimary === id) {
      setInsightsPrimary(null);
    } else if (insightsSecondary === id) {
      setInsightsSecondary(null);
    } else if (!insightsPrimary) {
      setInsightsPrimary(id);
    } else if (!insightsSecondary && insightsPrimary !== id) {
      setInsightsSecondary(id);
    } else {
      setInsightsPrimary(id);
      setInsightsSecondary(null);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAF7F2" }}>
        <p style={{ color: "#A8956E" }}>{t.loading}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-12" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light" style={{ color: "#2C2318" }}>{t.title}</h1>
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="flex items-center gap-1 border rounded-full px-1 py-1" style={{ borderColor: "#E5DED3" }}>
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setLanguage(lang.id as "fr" | "en" | "de")}
                  className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${
                    language === lang.id
                      ? "bg-gray-900 text-white"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {lang.flag}
                </button>
              ))}
            </div>
            <button 
              onClick={() => router.back()} 
              className="text-sm hover:underline" 
              style={{ color: "#A8956E" }}
            >
              {t.back}
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Name */}
          <div>
            <label className="block text-sm mb-2" style={{ color: "#6B5D4D" }}>{t.fullName}</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t.fullNamePlaceholder}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E5DED3", color: "#2C2318" }}
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm mb-2" style={{ color: "#6B5D4D" }}>
              {t.bio}
            </label>
            <p className="text-xs mb-2" style={{ color: "#A8956E" }}>
              {t.bioHelp}
            </p>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder={t.bioPlaceholder}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 resize-none"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E5DED3", color: "#2C2318" }}
            />
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm mb-2" style={{ color: "#6B5D4D" }}>{t.language}</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as "fr" | "en" | "de")}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E5DED3", color: "#2C2318" }}
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>{lang.flag} {lang.label}</option>
              ))}
            </select>
          </div>

          {/* CliftonStrengths */}
          <div className="p-5 rounded-xl" style={{ backgroundColor: "#F0EBE0" }}>
            <label className="block text-sm font-medium mb-3" style={{ color: "#2C2318" }}>
              {t.strengths} ({top5.length}/5)
            </label>
            
            {top5.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {top5.map((talent, i) => (
                  <button
                    key={talent}
                    onClick={() => toggleTalent(talent)}
                    className="px-3 py-1 rounded-full text-sm font-medium hover:opacity-80"
                    style={{ backgroundColor: "#2C2318", color: "#FAF7F2" }}
                  >
                    {i + 1}. {talent} ✕
                  </button>
                ))}
              </div>
            )}

            {top10.length > 5 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {top10.slice(5).map((talent, i) => (
                  <span
                    key={talent}
                    className="px-3 py-1 rounded-full text-xs"
                    style={{ backgroundColor: "#E5DED3", color: "#6B5D4D" }}
                  >
                    {i + 6}. {talent}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-4">
              {TALENTS.map((talent) => (
                <button
                  key={talent}
                  onClick={() => toggleTalent(talent)}
                  disabled={!top5.includes(talent) && top5.length >= 5}
                  className="px-3 py-1 rounded-full text-xs border transition-all disabled:opacity-30"
                  style={{
                    backgroundColor: top5.includes(talent) ? "#A8956E" : "#FFFFFF",
                    color: top5.includes(talent) ? "#FFFFFF" : "#6B5D4D",
                    borderColor: "#E5DED3",
                  }}
                >
                  {talent}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t" style={{ borderColor: "#E5DED3" }}>
              <p className="text-xs mb-2" style={{ color: "#A8956E" }}>{t.strengthsUpload}</p>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer px-4 py-2 rounded-lg text-sm transition-all hover:scale-105" style={{ backgroundColor: "#FFFFFF", color: "#6B5D4D", border: "1px solid #E5DED3" }}>
                  {uploading === "strengths" ? t.uploading : extracting === "strengths" ? t.extracting : t.uploadButton}
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0], "strengths")}
                  />
                </label>
                {strengthsFileUrl && (
                  <a href={strengthsFileUrl} target="_blank" className="text-xs underline" style={{ color: "#A8956E" }}>
                    {t.viewFile}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* DISC */}
          <div className="p-5 rounded-xl" style={{ backgroundColor: "#F0EBE0" }}>
            <label className="block text-sm font-medium mb-3" style={{ color: "#2C2318" }}>
              {t.disc}
            </label>
            <p className="text-xs mb-3" style={{ color: "#A8956E" }}>{t.discHelp}</p>
            
            <div className="grid grid-cols-4 gap-2 mb-4">
              {DISC_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => selectDisc(style.id)}
                  className="p-3 rounded-xl text-center transition-all hover:scale-105 relative"
                  style={{
                    backgroundColor: style.color,
                    color: style.textColor,
                    opacity: discPrimary === style.id || discSecondary === style.id ? 1 : 0.5,
                  }}
                >
                  {discPrimary === style.id && (
                    <span className="absolute -top-1 -right-1 text-xs font-bold bg-white text-gray-900 w-5 h-5 rounded-full flex items-center justify-center">1</span>
                  )}
                  {discSecondary === style.id && (
                    <span className="absolute -top-1 -right-1 text-xs font-bold bg-white text-gray-900 w-5 h-5 rounded-full flex items-center justify-center">2</span>
                  )}
                  <div className="text-xl font-bold">{style.id}</div>
                  <div className="text-xs opacity-80">{style.label}</div>
                </button>
              ))}
            </div>

            <div className="pt-3 border-t" style={{ borderColor: "#E5DED3" }}>
              <p className="text-xs mb-2" style={{ color: "#A8956E" }}>{t.discUpload}</p>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer px-4 py-2 rounded-lg text-sm transition-all hover:scale-105" style={{ backgroundColor: "#FFFFFF", color: "#6B5D4D", border: "1px solid #E5DED3" }}>
                  {uploading === "disc" ? t.uploading : extracting === "disc" ? t.extracting : t.uploadButton}
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0], "disc")}
                  />
                </label>
                {discFileUrl && (
                  <a href={discFileUrl} target="_blank" className="text-xs underline" style={{ color: "#A8956E" }}>
                    {t.viewFile}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Insights Discovery */}
          <div className="p-5 rounded-xl" style={{ backgroundColor: "#F0EBE0" }}>
            <label className="block text-sm font-medium mb-3" style={{ color: "#2C2318" }}>
              {t.insights}
            </label>
            <p className="text-xs mb-3" style={{ color: "#A8956E" }}>{t.insightsHelp}</p>

            <div className="grid grid-cols-4 gap-2 mb-4">
              {INSIGHTS_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => selectInsights(style.id)}
                  className="p-3 rounded-xl text-center transition-all hover:scale-105 relative"
                  style={{
                    backgroundColor: style.color,
                    color: style.textColor,
                    opacity: insightsPrimary === style.id || insightsSecondary === style.id ? 1 : 0.5,
                  }}
                >
                  {insightsPrimary === style.id && (
                    <span className="absolute -top-1 -right-1 text-xs font-bold bg-white text-gray-900 w-5 h-5 rounded-full flex items-center justify-center">1</span>
                  )}
                  {insightsSecondary === style.id && (
                    <span className="absolute -top-1 -right-1 text-xs font-bold bg-white text-gray-900 w-5 h-5 rounded-full flex items-center justify-center">2</span>
                  )}
                  <div className="text-sm font-bold">{style.label.split(" ")[0]}</div>
                  <div className="text-xs opacity-80">{style.label.split(" ").slice(1).join(" ")}</div>
                </button>
              ))}
            </div>

            <div className="pt-3 border-t" style={{ borderColor: "#E5DED3" }}>
              <p className="text-xs mb-2" style={{ color: "#A8956E" }}>{t.insightsUpload}</p>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer px-4 py-2 rounded-lg text-sm transition-all hover:scale-105" style={{ backgroundColor: "#FFFFFF", color: "#6B5D4D", border: "1px solid #E5DED3" }}>
                  {uploading === "insights" ? t.uploading : extracting === "insights" ? t.extracting : t.uploadButton}
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0], "insights")}
                  />
                </label>
                {insightsFileUrl && (
                  <a href={insightsFileUrl} target="_blank" className="text-xs underline" style={{ color: "#A8956E" }}>
                    {t.viewFile}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Save */}
          <div className="pt-4">
            <button
              onClick={saveProfile}
              disabled={saving}
              className="w-full py-3 rounded-full font-medium transition-all hover:scale-105 disabled:opacity-50"
              style={{ backgroundColor: "#2C2318", color: "#FAF7F2" }}
            >
              {saving ? t.saving : t.save}
            </button>
            {message && (
              <p className="text-center mt-4 text-sm" style={{ color: message.includes("Error") || message.includes("Erreur") || message.includes("Fehler") ? "#DC2626" : "#059669" }}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

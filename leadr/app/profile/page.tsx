"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
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
  { id: "D", label: "Dominance", color: "#DC2626", textColor: "#FFFFFF", description: "Direct, results-oriented" },
  { id: "I", label: "Influence", color: "#FBBF24", textColor: "#000000", description: "Enthusiastic, optimistic" },
  { id: "S", label: "Steadiness", color: "#16A34A", textColor: "#FFFFFF", description: "Patient, reliable" },
  { id: "C", label: "Conscientiousness", color: "#2563EB", textColor: "#FFFFFF", description: "Analytical, precise" },
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
  const [language, setLanguage] = useState("fr");
  
  const [discPrimary, setDiscPrimary] = useState<string | null>(null);
  const [discSecondary, setDiscSecondary] = useState<string | null>(null);
  const [discFileUrl, setDiscFileUrl] = useState<string | null>(null);
  const [strengthsFileUrl, setStrengthsFileUrl] = useState<string | null>(null);
  
  const [message, setMessage] = useState("");

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
      setLanguage(data.language || "fr");
      setDiscPrimary(data.disc_primary || null);
      setDiscSecondary(data.disc_secondary || null);
      setDiscFileUrl(data.disc_file_url || null);
      setStrengthsFileUrl(data.strengths_file_url || null);
    }
    setLoading(false);
  }

  async function uploadFile(file: File, type: "disc" | "strengths") {
    if (!userId) return;
    setUploading(type);

    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}/${type}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("profiles")
      .upload(fileName, file);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      setMessage("Error uploading file");
      setUploading(null);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("profiles")
      .getPublicUrl(fileName);

    if (type === "disc") setDiscFileUrl(publicUrl);
    if (type === "strengths") setStrengthsFileUrl(publicUrl);

    setUploading(null);
    setMessage("File uploaded!");
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
        language,
        disc_primary: discPrimary,
        disc_secondary: discSecondary,
        disc_file_url: discFileUrl,
        strengths_file_url: strengthsFileUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) {
      setMessage("Error saving profile");
      console.error(error);
    } else {
      setMessage("Profile saved!");
    }
    setSaving(false);
  }

  function toggleTalent(talent: string) {
    if (top5.includes(talent)) {
      setTop5(top5.filter(t => t !== talent));
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

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAF7F2" }}>
        <p style={{ color: "#A8956E" }}>Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-12" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light" style={{ color: "#2C2318" }}>Your Profile</h1>
          <Link href="/leadership" className="text-sm hover:underline" style={{ color: "#A8956E" }}>
            ← Back
          <button 
              onClick={() => router.back()} 
              className="text-sm hover:underline" 
              style={{ color: "#A8956E" }}
            >
              {t.back}
            </button>
        </div>

        <div className="space-y-8">
          {/* Name */}
          <div>
            <label className="block text-sm mb-2" style={{ color: "#6B5D4D" }}>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E5DED3", color: "#2C2318" }}
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm mb-2" style={{ color: "#6B5D4D" }}>
              Who do I think I am?
            </label>
            <p className="text-xs mb-2" style={{ color: "#A8956E" }}>
              A few lines about yourself — your values, what drives you, how you see yourself as a leader.
            </p>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="I am someone who..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 resize-none"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E5DED3", color: "#2C2318" }}
            />
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm mb-2" style={{ color: "#6B5D4D" }}>Preferred Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E5DED3", color: "#2C2318" }}
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="de">Deutsch</option>
            </select>
          </div>

          {/* CliftonStrengths */}
          <div className="p-5 rounded-xl" style={{ backgroundColor: "#F0EBE0" }}>
            <label className="block text-sm font-medium mb-3" style={{ color: "#2C2318" }}>
              CliftonStrengths Top 5 ({top5.length}/5)
            </label>
            
            {top5.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {top5.map((t, i) => (
                  <button
                    key={t}
                    onClick={() => toggleTalent(t)}
                    className="px-3 py-1 rounded-full text-sm font-medium hover:opacity-80"
                    style={{ backgroundColor: "#2C2318", color: "#FAF7F2" }}
                  >
                    {i + 1}. {t} ✕
                  </button>
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
              <p className="text-xs mb-2" style={{ color: "#A8956E" }}>Or upload your full report:</p>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer px-4 py-2 rounded-lg text-sm transition-all hover:scale-105" style={{ backgroundColor: "#FFFFFF", color: "#6B5D4D", border: "1px solid #E5DED3" }}>
                  {uploading === "strengths" ? "Uploading..." : "Upload PDF/Image"}
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0], "strengths")}
                  />
                </label>
                {strengthsFileUrl && (
                  <a href={strengthsFileUrl} target="_blank" className="text-xs underline" style={{ color: "#A8956E" }}>
                    View uploaded file
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* DISC */}
          <div className="p-5 rounded-xl" style={{ backgroundColor: "#F0EBE0" }}>
            <label className="block text-sm font-medium mb-3" style={{ color: "#2C2318" }}>
              DISC Profile (optional)
            </label>
            <p className="text-xs mb-3" style={{ color: "#A8956E" }}>Click to select primary, click again for secondary:</p>
            
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
              <p className="text-xs mb-2" style={{ color: "#A8956E" }}>Or upload your DISC report:</p>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer px-4 py-2 rounded-lg text-sm transition-all hover:scale-105" style={{ backgroundColor: "#FFFFFF", color: "#6B5D4D", border: "1px solid #E5DED3" }}>
                  {uploading === "disc" ? "Uploading..." : "Upload PDF/Image"}
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0], "disc")}
                  />
                </label>
                {discFileUrl && (
                  <a href={discFileUrl} target="_blank" className="text-xs underline" style={{ color: "#A8956E" }}>
                    View uploaded file
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
              {saving ? "Saving..." : "Save Profile"}
            </button>
            {message && (
              <p className="text-center mt-4 text-sm" style={{ color: message.includes("Error") ? "#DC2626" : "#059669" }}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

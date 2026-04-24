"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
  emailRedirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  if (sent) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-md w-full text-center">
          <div className="text-5xl mb-6">✉️</div>
          <h1 className="text-2xl font-light mb-4" style={{ color: "#2C2318" }}>
            Check your email
          </h1>
          <p className="mb-8" style={{ color: "#6B5D4D" }}>
            We sent a magic link to <strong>{email}</strong>
          </p>
          <p className="text-sm" style={{ color: "#A8956E" }}>
            Click the link in the email to sign in.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-light tracking-tight mb-2" style={{ color: "#2C2318" }}>
            LeadR
          </h1>
          <p style={{ color: "#A8956E" }}>Sign in to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm mb-2" style={{ color: "#6B5D4D" }}>
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: "#FFFFFF", 
                borderColor: "#E5DED3",
                color: "#2C2318"
              }}
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full font-medium transition-all hover:scale-105 disabled:opacity-50"
            style={{ backgroundColor: "#2C2318", color: "#FAF7F2" }}
          >
            {loading ? "Sending..." : "Send magic link"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm hover:underline" style={{ color: "#A8956E" }}>
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}

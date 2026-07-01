"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AuthStatus() {
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (loading) return null;

  if (!user) {
    return (
      <Link
        href="/login"
        className="text-sm hover:underline"
        style={{ color: "#A8956E" }}
      >
        Sign in
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-4 text-sm" style={{ color: "#6B5D4D" }}>
      <span>{user.email}</span>
      <button
        onClick={handleSignOut}
        className="hover:underline"
        style={{ color: "#A8956E" }}
      >
        Sign out
      </button>
    </div>
  );
}

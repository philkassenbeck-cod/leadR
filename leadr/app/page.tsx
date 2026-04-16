tsx

import Link from "next/link";

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: "#FAF7F2" }}
    >
      {/* Logo */}
      <div className="mb-8 text-center">
        <h1
          className="text-4xl font-medium mb-2"
          style={{ color: "#2C2318", fontFamily: "Georgia, serif" }}
        >
          LeadR
        </h1>
        <p
          className="text-sm tracking-widest uppercase"
          style={{ color: "#A8956E" }}
        >
          Leadership Intelligence
        </p>
      </div>

      {/* Headline */}
      <div className="max-w-md text-center mb-10">
        <h2
          className="text-2xl font-medium mb-4"
          style={{ color: "#2C2318", fontFamily: "Georgia, serif" }}
        >
          Become the leader you're meant to be
        </h2>
        <p className="text-base" style={{ color: "#A8956E" }}>
          Your AI-powered leadership companion.
          <br />
          Personal growth. Team development. Real results.
        </p>
      </div>

      {/* CTA Button */}
      <Link
        href="/leadership"
        className="px-10 py-4 rounded-xl text-lg font-medium transition-all duration-200 hover:scale-105"
        style={{
          background: "#2C2318",
          color: "#FAF7F2",
          boxShadow: "0 4px 14px rgba(44, 35, 24, 0.25)",
        }}
      >
        Start
      </Link>

      {/* Language indicator */}
      <p
        className="mt-6 text-xs tracking-widest"
        style={{ color: "#C9A96E" }}
      >
        FR · EN · DE
      </p>

      {/* Spacer */}
      <div className="flex-1 min-h-[120px]"></div>

      {/* Footer with Coach Pro link */}
      <div
        className="w-full max-w-md pt-6 pb-8 text-center"
        style={{ borderTop: "1px solid #E0D8C8" }}
      >
        <Link
          href="/coach-pro"
          className="text-sm transition-colors duration-200 hover:opacity-80"
          style={{ color: "#A8956E" }}
        >
          Are you a coach? <span style={{ color: "#C9A96E" }}>→</span>
        </Link>

        <p
          className="mt-4 text-xs tracking-widest"
          style={{ color: "#C9A96E" }}
        >
          OPTIMUP © 2026
        </p>
      </div>
    </main>
  );
}

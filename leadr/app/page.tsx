import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="max-w-2xl w-full text-center">
        
        {/* Logo / Title */}
        <h1 className="text-5xl font-light tracking-tight mb-2" style={{ color: "#2C2318" }}>
          LeadR
        </h1>
        <p className="text-lg mb-12" style={{ color: "#A8956E" }}>
          Leadership Intelligence
        </p>

        {/* Main headline */}
        <h2 className="text-2xl font-light mb-4" style={{ color: "#2C2318" }}>
          Become the leader you're meant to be
        </h2>
        <p className="text-base mb-10" style={{ color: "#6B5D4D" }}>
          AI-powered coaching grounded in your strengths.<br />
          Practical frameworks. Real situations. Your growth.
        </p>

        {/* Main CTA */}
        <Link
          href="/leadership"
          className="inline-block px-10 py-4 text-lg font-medium rounded-full transition-all hover:scale-105"
          style={{ 
            backgroundColor: "#2C2318", 
            color: "#FAF7F2",
          }}
        >
          Start
        </Link>

        {/* Spacer */}
        <div className="mt-20"></div>

        {/* Coach Pro link - discrete */}
        <Link
          href="/coach-pro"
          className="text-sm hover:underline transition-all"
          style={{ color: "#A8956E" }}
        >
          Are you a coach? →
        </Link>

      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 text-xs" style={{ color: "#A8956E" }}>
        LeadR · Strengths-based · Powered by Philippe Kassenbeck / OPTIMUP
      </footer>
    </main>
  );
}

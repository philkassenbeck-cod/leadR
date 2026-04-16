import Link from "next/link";

export default function CoachPro() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="max-w-xl w-full text-center">
        
        {/* Badge */}
        <div 
          className="inline-block px-4 py-2 rounded-full text-sm mb-8"
          style={{ backgroundColor: "#F0EBE0", color: "#A8956E" }}
        >
          Coming Soon
        </div>

        {/* Title */}
        <h1 className="text-4xl font-light tracking-tight mb-4" style={{ color: "#2C2318" }}>
          LeadR for Coaches
        </h1>
        
        <p className="text-lg mb-8" style={{ color: "#6B5D4D" }}>
          A dedicated space for professional coaches to support their coachees with AI-powered insights.
        </p>

        {/* Features preview */}
        <div className="text-left space-y-4 mb-12 p-6 rounded-2xl" style={{ backgroundColor: "#F0EBE0" }}>
          <p className="text-sm font-medium mb-4" style={{ color: "#2C2318" }}>What's coming:</p>
          <div className="space-y-3" style={{ color: "#6B5D4D" }}>
            <p>→ View your coachees' strengths profiles</p>
            <p>→ Track patterns and growth themes</p>
            <p>→ Prepare sessions with AI-generated insights</p>
            <p>→ Respect privacy: conversations stay private</p>
          </div>
        </div>

       {/* CTA */}
        <p className="text-sm mb-6" style={{ color: "#A8956E" }}>
          Want early access? Get in touch.
        </p>
        
        
          href="mailto:pkassenbeck@optimup.ch?subject=LeadR Coach Pro - Early Access"
          className="inline-block px-8 py-3 text-base font-medium rounded-full transition-all hover:scale-105 mb-8"
          style={{ 
            backgroundColor: "#2C2318", 
            color: "#FAF7F2",
          }}
        >
          Contact Us
        </a>
        {/* Back link */}
        <div>
          <Link
            href="/"
            className="text-sm hover:underline transition-all"
            style={{ color: "#A8956E" }}
          >
            ← Back to LeadR
          </Link>
        </div>

      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 text-xs" style={{ color: "#A8956E" }}>
        LeadR · Powered by Philippe Kassenbeck / OPTIMUP
      </footer>
    </main>
  );
}

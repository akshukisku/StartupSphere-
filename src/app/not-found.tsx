"use client"
import { ArrowRight, Home, Layers } from "lucide-react";

// ─── Keyframes + values Tailwind cannot express ───────────────────────────────
const KEYFRAMES = `
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap');

  @keyframes t4-float {
    0%, 100% { transform: translateY(0)     scale(1);    }
    50%       { transform: translateY(-18px) scale(1.04); }
  }
  @keyframes t4-bounce {
    0%, 100% { transform: translateX(-50%) translateY(0);     }
    50%       { transform: translateX(-50%) translateY(-12px); }
  }
  @keyframes t4-twinkle {
    0%, 100% { opacity: 0.15; transform: scale(0.8); }
    50%       { opacity: 0.50; transform: scale(1.2); }
  }
  @keyframes t4-pulse {
    0%, 100% { opacity: 1;   transform: scale(1);   }
    50%       { opacity: 0.4; transform: scale(0.7); }
  }

  .t4-anim-float   { animation: t4-float   6s   ease-in-out infinite; }
  .t4-anim-bounce  { animation: t4-bounce  3s   ease-in-out infinite; }
  .t4-anim-twinkle { animation: t4-twinkle 4s   ease-in-out infinite; }
  .t4-anim-pulse   { animation: t4-pulse   1.8s ease-in-out infinite; }

  /* Fluid type — clamp() not available in plain Tailwind */
  .t4-ghost    { font-size: clamp(72px,  22vw, 240px); }
  .t4-heading  { font-size: clamp(32px,   7vw,  68px); }
  .t4-body     { font-size: clamp(13px, 1.6vw,  15px); }
  .t4-discover { font-size: clamp(16px, 3.2vw,  38px); }

  /* Figurine: fluid width + anchored to bottom-center */
  .t4-fig-wrap {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: clamp(100px, 20vw, 200px);
    transform: translateX(-50%);
    pointer-events: none;
    z-index: 5;
    animation: t4-bounce 3s ease-in-out infinite;
  }

  /* Content block: push up enough to clear the figurine at every size */
  .t4-content {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
    padding: 0 1.25rem;
    margin-bottom: clamp(110px, 22vw, 210px);
  }

  /* Coral drop-shadow (rgba, not in Tailwind's scale) */
  .t4-fig-shadow { filter: drop-shadow(0 6px 28px rgba(244,132,95,0.45)); }

  /* Button hover states */
  .t4-btn-primary:hover { background-color: #F79B7F !important; }
  .t4-btn-ghost:hover   {
    background-color: rgba(255,255,255,0.09) !important;
    border-color:     rgba(255,255,255,0.50) !important;
    color: #ffffff !important;
  }
  .t4-discover-a:hover { opacity: 1 !important; }

  /* Prevent heading line-breaks from shattering on narrow screens */
  .t4-heading { white-space: normal; word-break: keep-all; hyphens: none; }
`;

// ─── Brand palette ────────────────────────────────────────────────────────────
const C = {
  bg:         "#1a1a2e",
  coral:      "#F4845F",
  coralLight: "#F79B7F",
  coralDark:  "#E06040",
  coralDeep:  "#C04820",
  green:      "#6BBF7A",
  blue:       "#6EB5FF",
  pink:       "#E882B4",
  skin:       "#FFDAC1",
} as const;

// ─── Ambient circles ──────────────────────────────────────────────────────────
const CIRCLES = [
  { bg: C.coral, size: 340, top: "-80px",   left: "-60px",  delay: "0s"  },
  { bg: C.blue,  size: 260, bottom: "-60px", right: "-40px", delay: "-2s" },
  { bg: C.pink,  size: 180, top: "30%",     right: "10%",   delay: "-4s" },
  { bg: C.green, size: 120, bottom: "22%",  left: "6%",     delay: "-1s" },
] as const;

// ─── Sparkle dots ─────────────────────────────────────────────────────────────
const DOTS = [
  { size: 6, bg: C.coral, top: "18%", left: "22%", delay: "0s"    },
  { size: 4, bg: C.blue,  top: "30%", left: "72%", delay: "-1.5s" },
  { size: 7, bg: C.pink,  top: "55%", left: "14%", delay: "-0.8s" },
  { size: 5, bg: C.green, top: "65%", left: "80%", delay: "-2.5s" },
  { size: 4, bg: C.coral, top: "11%", left: "60%", delay: "-3s"   },
  { size: 6, bg: C.blue,  top: "78%", left: "38%", delay: "-1s"   },
] as const;

// ─── Figurine SVG ─────────────────────────────────────────────────────────────
function FigurineSVG() {
  return (
    <svg
      className="w-full h-auto t4-fig-shadow"
      viewBox="0 0 200 320"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="t4-headGrad" cx="50%" cy="40%" r="52%">
          <stop offset="0%"   stopColor={C.skin}  />
          <stop offset="100%" stopColor={C.coral}  />
        </radialGradient>
        <radialGradient id="t4-bodyGrad" cx="50%" cy="30%" r="60%">
          <stop offset="0%"   stopColor={C.coralLight} />
          <stop offset="100%" stopColor={C.coralDark}  />
        </radialGradient>
        <radialGradient id="t4-shad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgba(244,132,95,0.40)" />
          <stop offset="100%" stopColor="rgba(244,132,95,0.00)" />
        </radialGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="100" cy="316" rx="52" ry="10" fill="url(#t4-shad)" />

      {/* legs */}
      <rect x="74"  y="258" width="20" height="46" rx="10" fill={C.coralDark} />
      <rect x="106" y="258" width="20" height="46" rx="10" fill={C.coralDark} />
      {/* shoes */}
      <rect x="68"  y="296" width="30" height="14" rx="7" fill={C.bg} opacity="0.85" />
      <rect x="102" y="296" width="30" height="14" rx="7" fill={C.bg} opacity="0.85" />

      {/* body */}
      <rect x="60" y="160" width="80" height="108" rx="22" fill="url(#t4-bodyGrad)" />

      {/* 404 badge on chest */}
      <rect x="72" y="190" width="56" height="26" rx="6" fill={C.bg} opacity="0.45" />
      <text
        x="100" y="208"
        fontFamily="'Anton', sans-serif"
        fontSize="15"
        textAnchor="middle"
        fill="#ffffff"
        opacity="0.95"
      >
        404
      </text>

      {/* arms */}
      <rect x="34"  y="162" width="28" height="72" rx="14" fill={C.coral} />
      <rect x="138" y="162" width="28" height="72" rx="14" fill={C.coral} />
      {/* hands */}
      <rect x="26"  y="222" width="34" height="16" rx="8" fill={C.coralDark} opacity="0.85" />
      <rect x="140" y="222" width="34" height="16" rx="8" fill={C.coralDark} opacity="0.85" />

      {/* head */}
      <ellipse cx="100" cy="155" rx="46" ry="50" fill="url(#t4-headGrad)" />

      {/* eye whites */}
      <circle cx="84"  cy="148" r="7" fill="#ffffff" />
      <circle cx="116" cy="148" r="7" fill="#ffffff" />
      {/* X pupils */}
      <line x1="81" y1="145" x2="87" y2="151" stroke={C.bg} strokeWidth="2.2" strokeLinecap="round" />
      <line x1="87" y1="145" x2="81" y2="151" stroke={C.bg} strokeWidth="2.2" strokeLinecap="round" />
      <line x1="113" y1="145" x2="119" y2="151" stroke={C.bg} strokeWidth="2.2" strokeLinecap="round" />
      <line x1="119" y1="145" x2="113" y2="151" stroke={C.bg} strokeWidth="2.2" strokeLinecap="round" />

      {/* mouth */}
      <path
        d="M88 168 Q94 174 100 168 Q106 162 112 168"
        stroke={C.coralDeep}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* blush */}
      <ellipse cx="78"  cy="160" rx="6" ry="4" fill={C.coralLight} opacity="0.65" />
      <ellipse cx="122" cy="160" rx="6" ry="4" fill={C.coralLight} opacity="0.65" />

      {/* hair */}
      <ellipse cx="100" cy="112" rx="24" ry="10" fill={C.skin} opacity="0.55" />
      <path d="M76 108 Q82 90 100 95 Q118 90 124 108" fill={C.coralDeep} opacity="0.55" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function NotFound404() {
  return (
    <>
      <style>{KEYFRAMES}</style>

      <div
        role="main"
        className="relative w-full h-screen min-h-[520px] overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: C.bg, fontFamily: "'Inter', sans-serif" }}
      >

        {/* Ambient circles */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {CIRCLES.map((c, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-[0.18] t4-anim-float"
              style={{
                width:  c.size,
                height: c.size,
                backgroundColor: c.bg,
                top:    "top"    in c ? c.top    : undefined,
                bottom: "bottom" in c ? c.bottom : undefined,
                left:   "left"   in c ? c.left   : undefined,
                right:  "right"  in c ? c.right  : undefined,
                animationDelay: c.delay,
              }}
            />
          ))}
        </div>

        {/* Sparkle dots */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {DOTS.map((d, i) => (
            <div
              key={i}
              className="absolute rounded-full t4-anim-twinkle"
              style={{
                width:  d.size,
                height: d.size,
                backgroundColor: d.bg,
                top:  d.top,
                left: d.left,
                animationDelay: d.delay,
              }}
            />
          ))}
        </div>

        {/* Ghost "404" */}
        <div
          aria-hidden="true"
          className="t4-ghost absolute inset-0 flex items-center justify-center font-black text-white opacity-[0.04] leading-none tracking-[-0.03em] select-none pointer-events-none whitespace-nowrap"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          404
        </div>

        {/* Brand label — top-left */}
        <span
          aria-label="TOONHUB"
          className="absolute top-5 left-4 sm:top-6 sm:left-6 z-[60] text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-white opacity-60"
        >
          TOONHUB
        </span>

        {/* ── Main content block ── */}
        <div className="t4-content">

          {/* Badge */}
          <div
            role="status"
            className="inline-flex items-center gap-[6px] rounded-full px-3 py-1 mb-3 sm:mb-4 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] border"
            style={{
              backgroundColor: "rgba(244,132,95,0.22)",
              borderColor:     "rgba(244,132,95,0.50)",
              color: C.coral,
            }}
          >
            <span
              aria-hidden="true"
              className="w-[5px] h-[5px] sm:w-[6px] sm:h-[6px] rounded-full t4-anim-pulse flex-shrink-0"
              style={{ backgroundColor: C.coral }}
            />
            Page not found
          </div>

          {/* Heading — NO <br />, let it wrap naturally */}
          <h1
            className="t4-heading font-normal text-white uppercase leading-[1.08] tracking-[-0.02em] mb-2 sm:mb-3 max-w-[18ch]"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            Lost in the{" "}
            <span style={{ color: C.coral }}>void</span>
          </h1>

          {/* Body copy */}
          <p
            className="t4-body leading-relaxed max-w-xs sm:max-w-sm mb-5 sm:mb-7"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            This figurine wandered off the shelf. The page you're looking for
            doesn't exist — but our collection still does.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">

            <button
              onClick={() => (window.location.href = "/")}
              aria-label="Go to homepage"
              className="t4-btn-primary inline-flex items-center gap-2 rounded-full px-5 py-[10px] sm:px-6 sm:py-3 text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.06em] text-white border-0 cursor-pointer transition-transform duration-150 ease-out hover:scale-[1.04] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 w-full sm:w-auto justify-center"
              style={{ backgroundColor: C.coral }}
            >
              <Home size={13} strokeWidth={2.5} aria-hidden="true" />
              Go home
            </button>

            <button
              onClick={() => (window.location.href = "/collection")}
              aria-label="Browse the TOONHUB collection"
              className="t4-btn-ghost inline-flex items-center gap-2 rounded-full px-5 py-[9px] sm:px-[22px] sm:py-[11px] text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.06em] bg-transparent cursor-pointer border transition-all duration-150 ease-out hover:scale-[1.04] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 w-full sm:w-auto justify-center"
              style={{
                color:       "rgba(255,255,255,0.60)",
                borderColor: "rgba(255,255,255,0.22)",
              }}
            >
              <Layers size={13} strokeWidth={2.25} aria-hidden="true" />
              Browse collection
            </button>

          </div>
        </div>

        {/* Figurine — bottom-center */}
        <div className="t4-fig-wrap" aria-hidden="true">
          <FigurineSVG />
        </div>

        {/* Discover link — bottom-right */}
        <a
          href="/collection"
          aria-label="Discover the TOONHUB figurines collection"
          className="t4-discover t4-discover-a absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] inline-flex items-center gap-[6px] font-normal text-white uppercase tracking-[-0.02em] leading-none no-underline opacity-70 cursor-pointer transition-all duration-200 ease-out hover:scale-[1.04] focus-visible:outline focus-visible:outline-2 focus-visible:rounded"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          Discover it
          <ArrowRight
            className="w-4 h-4 sm:w-5 sm:h-5"
            strokeWidth={2.25}
            aria-hidden="true"
          />
        </a>

      </div>
    </>
  );
}
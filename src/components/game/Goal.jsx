export default function Goal({ cellSize }) {
  return (
    <div
      className="absolute z-10 flex items-center justify-center animate-float"
      style={{ width: cellSize, height: cellSize }}
    >
      <svg viewBox="0 0 40 40" className="drop-shadow-lg" style={{ width: cellSize * 0.85, height: cellSize * 0.85 }}>
        {/* Glow pulse */}
        <circle cx="20" cy="20" r="18" fill="none" stroke="#F43F5E" strokeWidth="1" opacity="0.5">
          <animate attributeName="r" values="16;19;16" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.1;0.5" dur="1.5s" repeatCount="indefinite" />
        </circle>
        {/* Heart shape */}
        <path
          d="M20 30 C20 30 6 22 6 13 C6 8 10 5 14 5 C16.5 5 18.5 6.5 20 8.5 C21.5 6.5 23.5 5 26 5 C30 5 34 8 34 13 C34 22 20 30 20 30Z"
          fill="#F43F5E"
        />
        <path
          d="M20 27 C20 27 9 20 9 13 C9 9.5 12 8 14 8 C16 8 18 9 20 11.5 C22 9 24 8 26 8 C28 8 31 9.5 31 13 C31 20 20 27 20 27Z"
          fill="#FB7185"
        />
        {/* Shine */}
        <ellipse cx="15" cy="11" rx="3" ry="2" fill="white" opacity="0.4" />
        {/* Sparkles */}
        <path d="M34 6 L35 9 L38 9 L36 11 L37 14 L34 12 L31 14 L32 11 L30 9 L33 9Z" fill="#FDE047" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.2;0.9" dur="1.2s" repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  );
}
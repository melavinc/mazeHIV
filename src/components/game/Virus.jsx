export default function Virus({ cellSize }) {
  return (
    <div
      className="absolute z-10 flex items-center justify-center animate-virus-wobble"
      style={{ width: cellSize, height: cellSize }}
    >
      <svg viewBox="0 0 40 40" className="drop-shadow-lg" style={{ width: cellSize * 0.85, height: cellSize * 0.85 }}>
        {/* Spikes */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 20 + Math.cos(rad) * 12;
          const y1 = 20 + Math.sin(rad) * 12;
          const x2 = 20 + Math.cos(rad) * 18;
          const y2 = 20 + Math.sin(rad) * 18;
          return (
            <g key={angle}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx={x2} cy={y2} r="2" fill="#F87171" />
            </g>
          );
        })}
        {/* Body */}
        <circle cx="20" cy="20" r="12" fill="#DC2626" />
        <circle cx="20" cy="20" r="10" fill="#EF4444" />
        {/* Evil eyes */}
        <ellipse cx="16" cy="18" rx="2.5" ry="3" fill="#1E293B" />
        <ellipse cx="24" cy="18" rx="2.5" ry="3" fill="#1E293B" />
        {/* Evil eyebrows */}
        <line x1="13" y1="14" x2="18" y2="15.5" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="27" y1="14" x2="22" y2="15.5" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
        {/* Mean mouth */}
        <path d="M15 24 Q17 22 20 24 Q23 22 25 24" stroke="#1E293B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}
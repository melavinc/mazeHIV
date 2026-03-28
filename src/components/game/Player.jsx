export default function Player({ cellSize, isHit, immune }) {
  return (
    <div
      className="absolute transition-all duration-150 ease-out z-20 flex items-center justify-center"
      style={{ width: cellSize, height: cellSize }}
    >
      <div
        className={`relative flex items-center justify-center transition-all duration-100 ${
          isHit ? "scale-75 opacity-60" : "scale-100"
        } ${immune ? "filter drop-shadow(0 0 6px rgba(34,211,238,1))" : ""}`}
        style={{ width: cellSize * 0.8, height: cellSize * 0.8 }}
      >
        {/* Body */}
        <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-lg">
          {/* Legs */}
          <rect x="12" y="30" width="5" height="8" rx="2" fill="#3B82F6" />
          <rect x="23" y="30" width="5" height="8" rx="2" fill="#3B82F6" />
          {/* Body */}
          <rect x="10" y="14" width="20" height="18" rx="4" fill="#3B82F6" />
          {/* Head */}
          <circle cx="20" cy="11" r="9" fill="#FCD34D" />
          {/* Eyes */}
          <circle cx="16" cy="10" r="2" fill="#1E293B" />
          <circle cx="24" cy="10" r="2" fill="#1E293B" />
          {/* Smile */}
          <path d="M15 14 Q20 18 25 14" stroke="#1E293B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Arms */}
          <rect x="4" y="16" width="7" height="4" rx="2" fill="#FCD34D" />
          <rect x="29" y="16" width="7" height="4" rx="2" fill="#FCD34D" />
        </svg>
        {isHit && (
          <div className="absolute inset-0 rounded-full bg-destructive/40 animate-ping" />
        )}
      </div>
    </div>
  );
}
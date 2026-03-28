export default function CondomPowerup({ cellSize }) {
  return (
    <div
      className="absolute z-10 flex items-center justify-center"
      style={{ width: cellSize, height: cellSize }}
    >
      <svg viewBox="0 0 40 40" className="drop-shadow-lg" style={{ width: cellSize * 0.8, height: cellSize * 0.8 }}>
        {/* Glow */}
        <circle cx="20" cy="20" r="17" fill="none" stroke="#22D3EE" strokeWidth="1.5" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.15;0.6" dur="1.8s" repeatCount="indefinite" />
          <animate attributeName="r" values="15;18;15" dur="1.8s" repeatCount="indefinite" />
        </circle>
        {/* Wrapper packet */}
        <rect x="9" y="5" width="22" height="30" rx="6" fill="#0891B2" />
        <rect x="11" y="7" width="18" height="26" rx="5" fill="#06B6D4" />
        {/* Circle symbol inside */}
        <circle cx="20" cy="20" r="7" fill="none" stroke="#CFFAFE" strokeWidth="2.5" />
        <circle cx="20" cy="20" r="3.5" fill="#A5F3FC" opacity="0.7" />
        {/* "+" health icon */}
        <rect x="18.5" y="16" width="3" height="8" rx="1" fill="white" opacity="0.9" />
        <rect x="16" y="18.5" width="8" height="3" rx="1" fill="white" opacity="0.9" />
        {/* Shine */}
        <ellipse cx="15" cy="11" rx="3" ry="2" fill="white" opacity="0.35" />
      </svg>
    </div>
  );
}
import { Heart, Clock, Trophy, Shield } from "lucide-react";

export default function GameHUD({ lives, time, level, immunity }) {
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center justify-between w-full px-2 py-3 sm:px-4 flex-wrap gap-2">
      <div className="flex items-center gap-1.5">
        {[...Array(3)].map((_, i) => (
          <Heart
            key={i}
            className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
              i < lives
                ? "text-red-500 fill-red-500 scale-100"
                : "text-slate-700 scale-75 opacity-40"
            }`}
          />
        ))}
      </div>

      {immunity > 0 && (
        <div className="flex items-center gap-1.5 bg-cyan-500/20 border border-cyan-400/40 rounded-lg px-3 py-1">
          <Shield className="w-4 h-4 text-cyan-400 fill-cyan-400/30" />
          <span className="font-pixel text-xs text-cyan-300">{immunity}s</span>
        </div>
      )}

      <div className="flex items-center gap-1.5 text-accent font-pixel text-xs sm:text-sm">
        <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>{level}</span>
      </div>

      <div className="flex items-center gap-1.5 text-foreground font-pixel text-xs sm:text-sm">
        <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>{formatTime(time)}</span>
      </div>
    </div>
  );
}
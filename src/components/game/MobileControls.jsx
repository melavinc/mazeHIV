import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

export default function MobileControls({ onMove }) {
  const btnClass =
    "w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center active:bg-primary/30 active:border-primary/50 transition-all touch-manipulation select-none";

  return (
    <div className="flex flex-col items-center gap-1.5 mt-4 sm:hidden">
      <button className={btnClass} onTouchStart={() => onMove("up")} onClick={() => onMove("up")}>
        <ArrowUp className="w-6 h-6 text-foreground" />
      </button>
      <div className="flex gap-1.5">
        <button className={btnClass} onTouchStart={() => onMove("left")} onClick={() => onMove("left")}>
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <button className={btnClass} onTouchStart={() => onMove("down")} onClick={() => onMove("down")}>
          <ArrowDown className="w-6 h-6 text-foreground" />
        </button>
        <button className={btnClass} onTouchStart={() => onMove("right")} onClick={() => onMove("right")}>
          <ArrowRight className="w-6 h-6 text-foreground" />
        </button>
      </div>
    </div>
  );
}
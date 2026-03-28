import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, ArrowRight, Trophy } from "lucide-react";

export default function GameOverlay({ state, level, time, onStart, onRestart, onNextLevel, totalLevels }) {
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <AnimatePresence>
      {state !== "playing" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-md rounded-xl"
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 20 }}
            className="flex flex-col items-center gap-5 p-8 text-center"
          >
            {state === "idle" && (
              <>
                <div className="text-5xl sm:text-6xl mb-2">🏃‍♂️</div>
                <h1 className="font-pixel text-lg sm:text-2xl text-primary tracking-wider">
                  VIRUS MAZE
                </h1>
                <p className="text-muted-foreground text-sm max-w-xs font-inter">
                  Attraversa il labirinto evitando i virus.<br/>
                  Trova il preservativo alla fine!
                </p>
                <p className="text-muted-foreground/60 text-xs font-inter hidden sm:block">
                  Usa le frecce della tastiera per muoverti
                </p>
                <Button onClick={onStart} size="lg" className="mt-2 font-pixel text-xs gap-2 px-8">
                  <Play className="w-4 h-4" />
                  GIOCA
                </Button>
              </>
            )}

            {state === "won" && (
              <>
                <div className="text-5xl sm:text-6xl mb-2">🎉</div>
                <h2 className="font-pixel text-lg sm:text-xl text-primary">
                  {level < totalLevels ? "LIVELLO SUPERATO!" : "HAI VINTO!"}
                </h2>
                <p className="text-muted-foreground text-sm font-inter">
                  Tempo: <span className="text-accent font-semibold">{formatTime(time)}</span>
                </p>
                {level < totalLevels && (
                  <p className="text-muted-foreground/60 text-xs font-inter">
                    Hai trovato il preservativo! Prossimo livello...
                  </p>
                )}
                {level >= totalLevels && (
                  <div className="flex items-center gap-2 text-accent">
                    <Trophy className="w-5 h-5" />
                    <span className="font-pixel text-xs">TUTTI I LIVELLI COMPLETATI!</span>
                  </div>
                )}
                <div className="flex gap-3 mt-2">
                  <Button onClick={onRestart} variant="outline" className="font-pixel text-xs gap-2">
                    <RotateCcw className="w-4 h-4" />
                    RICOMINCIA
                  </Button>
                  {level < totalLevels && (
                    <Button onClick={onNextLevel} className="font-pixel text-xs gap-2">
                      <ArrowRight className="w-4 h-4" />
                      PROSSIMO
                    </Button>
                  )}
                </div>
              </>
            )}

            {state === "lost" && (
              <>
                <div className="text-5xl sm:text-6xl mb-2">💀</div>
                <h2 className="font-pixel text-lg sm:text-xl text-destructive">
                  GAME OVER
                </h2>
                <p className="text-muted-foreground text-sm font-inter">
                  I virus ti hanno preso!
                </p>
                <Button onClick={onRestart} size="lg" className="mt-2 font-pixel text-xs gap-2 px-8">
                  <RotateCcw className="w-4 h-4" />
                  RIPROVA
                </Button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
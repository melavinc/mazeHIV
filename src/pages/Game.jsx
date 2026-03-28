import MazeBoard from "../components/game/MazeBoard";

export default function Game() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <MazeBoard />
        <p className="text-muted-foreground/40 text-xs font-inter mt-6 text-center">
          Evita i virus 🦠 — Trova il preservativo 🏆
        </p>
      </div>
    </div>
  );
}
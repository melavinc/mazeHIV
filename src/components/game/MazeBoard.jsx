import { useState, useEffect, useCallback, useRef } from "react";
import MazeCell from "./MazeCell";
import Player from "./Player";
import Virus from "./Virus";
import Goal from "./Goal";
import CondomPowerup from "./CondomPowerup";
import GameHUD from "./GameHUD";
import MobileControls from "./MobileControls";
import GameOverlay from "./GameOverlay";
import {
  MAZE_LEVELS,
  CELL_TYPES,
  getStartPosition,
  getGoalPosition,
  getVirusPositions,
  getCondomPositions,
} from "../../lib/mazeData";

const TOTAL_LEVELS = MAZE_LEVELS.length;
const IMMUNITY_DURATION = 10;

export default function MazeBoard() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [playerPos, setPlayerPos] = useState({ row: 1, col: 0 });
  const [lives, setLives] = useState(3);
  const [time, setTime] = useState(0);
  const [gameState, setGameState] = useState("idle");
  const [isHit, setIsHit] = useState(false);
  const [cellSize, setCellSize] = useState(28);
  const [immunity, setImmunity] = useState(0);
  const [collectedCondoms, setCollectedCondoms] = useState([]);
  const hitCooldown = useRef(false);
  const immunityInterval = useRef(null);

  const currentLevel = MAZE_LEVELS[levelIndex];
  const grid = currentLevel.grid;
  const cols = grid[0].length;
  const rows = grid.length;

  useEffect(() => {
    const updateSize = () => {
      const maxW = Math.min(window.innerWidth - 32, 700);
      const maxH = window.innerHeight * 0.55;
      const sizeW = Math.floor(maxW / cols);
      const sizeH = Math.floor(maxH / rows);
      setCellSize(Math.max(16, Math.min(sizeW, sizeH, 36)));
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [cols, rows]);

  // Game timer
  useEffect(() => {
    if (gameState !== "playing") return;
    const interval = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [gameState]);

  // Immunity countdown
  const startImmunity = useCallback(() => {
    if (immunityInterval.current) clearInterval(immunityInterval.current);
    setImmunity(IMMUNITY_DURATION);
    immunityInterval.current = setInterval(() => {
      setImmunity((prev) => {
        if (prev <= 1) {
          clearInterval(immunityInterval.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const initLevel = useCallback((idx) => {
    const lvl = MAZE_LEVELS[idx];
    const start = getStartPosition(lvl.grid);
    setPlayerPos(start);
    setCollectedCondoms([]);
    setIsHit(false);
    hitCooldown.current = false;
    if (immunityInterval.current) clearInterval(immunityInterval.current);
    setImmunity(0);
  }, []);

  const startGame = useCallback(() => {
    initLevel(0);
    setLevelIndex(0);
    setLives(3);
    setTime(0);
    setGameState("playing");
  }, [initLevel]);

  const restartGame = useCallback(() => {
    initLevel(0);
    setLevelIndex(0);
    setLives(3);
    setTime(0);
    setGameState("playing");
  }, [initLevel]);

  const nextLevel = useCallback(() => {
    const next = levelIndex + 1;
    if (next >= TOTAL_LEVELS) return;
    setLevelIndex(next);
    initLevel(next);
    setTime(0);
    setGameState("playing");
  }, [levelIndex, initLevel]);

  const movePlayer = useCallback(
    (direction) => {
      if (gameState !== "playing") return;

      setPlayerPos((prev) => {
        let newRow = prev.row;
        let newCol = prev.col;

        switch (direction) {
          case "up": newRow--; break;
          case "down": newRow++; break;
          case "left": newCol--; break;
          case "right": newCol++; break;
        }

        if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols) return prev;

        const cellType = grid[newRow][newCol];
        if (cellType === CELL_TYPES.WALL) return prev;

        const newPos = { row: newRow, col: newCol };

        // Goal check
        const goal = getGoalPosition(grid);
        if (newRow === goal.row && newCol === goal.col) {
          setGameState("won");
          return newPos;
        }

        // Condom power-up
        if (cellType === CELL_TYPES.CONDOM) {
          setCollectedCondoms((prev) => [...prev, `${newRow}-${newCol}`]);
          startImmunity();
        }

        // Virus check (only if no immunity)
        if (cellType === CELL_TYPES.VIRUS && !hitCooldown.current) {
          setImmunity((imm) => {
            if (imm > 0) return imm; // immune!
            hitCooldown.current = true;
            setIsHit(true);
            setLives((l) => {
              const newLives = l - 1;
              if (newLives <= 0) setGameState("lost");
              return newLives;
            });
            setTimeout(() => {
              setIsHit(false);
              hitCooldown.current = false;
            }, 800);
            return imm;
          });
        }

        return newPos;
      });
    },
    [gameState, grid, rows, cols, startImmunity]
  );

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e) => {
      const map = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
        w: "up",
        s: "down",
        a: "left",
        d: "right",
      };
      const dir = map[e.key];
      if (dir) {
        e.preventDefault();
        movePlayer(dir);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [movePlayer]);

  const virusPositions = getVirusPositions(grid);
  const goalPos = getGoalPosition(grid);
  const allCondoms = getCondomPositions(grid);
  const visibleCondoms = allCondoms.filter(
    (c) => !collectedCondoms.includes(`${c.row}-${c.col}`)
  );

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
      <GameHUD lives={lives} time={time} level={levelIndex + 1} immunity={immunity} />

      <div className="relative">
        <GameOverlay
          state={gameState}
          level={levelIndex + 1}
          time={time}
          onStart={startGame}
          onRestart={restartGame}
          onNextLevel={nextLevel}
          totalLevels={TOTAL_LEVELS}
        />

        {/* Maze Grid */}
        <div
          className="grid border-2 border-slate-600/50 rounded-xl overflow-hidden shadow-2xl shadow-primary/5"
          style={{
            gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
          }}
        >
          {grid.map((row, r) =>
            row.map((cell, c) => (
              <MazeCell key={`${r}-${c}`} type={cell} cellSize={cellSize} />
            ))
          )}
        </div>

        {/* Player */}
        <div
          className={`absolute transition-all duration-150 ease-out ${immunity > 0 ? "drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]" : ""}`}
          style={{
            top: playerPos.row * cellSize,
            left: playerPos.col * cellSize,
          }}
        >
          <Player cellSize={cellSize} isHit={isHit} immune={immunity > 0} />
        </div>

        {/* Viruses */}
        {virusPositions.map((v, i) => (
          <div
            key={`virus-${i}`}
            className="absolute"
            style={{ top: v.row * cellSize, left: v.col * cellSize }}
          >
            <Virus cellSize={cellSize} />
          </div>
        ))}

        {/* Condom power-ups */}
        {visibleCondoms.map((c, i) => (
          <div
            key={`condom-${i}`}
            className="absolute"
            style={{ top: c.row * cellSize, left: c.col * cellSize }}
          >
            <CondomPowerup cellSize={cellSize} />
          </div>
        ))}

        {/* Goal */}
        <div
          className="absolute"
          style={{ top: goalPos.row * cellSize, left: goalPos.col * cellSize }}
        >
          <Goal cellSize={cellSize} />
        </div>
      </div>

      <MobileControls onMove={movePlayer} />
    </div>
  );
}
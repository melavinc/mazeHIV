import { CELL_TYPES } from "../../lib/mazeData";

export default function MazeCell({ type, cellSize }) {
  const baseStyle = {
    width: cellSize,
    height: cellSize,
    minWidth: cellSize,
    minHeight: cellSize,
  };

  if (type === CELL_TYPES.WALL) {
    return (
      <div
        style={baseStyle}
        className="bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-600/30 rounded-sm"
      />
    );
  }

  return (
    <div
      style={baseStyle}
      className="bg-slate-800/40"
    />
  );
}
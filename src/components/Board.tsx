import React from "react";
import { useBoardControls } from "../hooks/boardControls";
import { usePieceControls } from "../hooks/pieceControls";
import CascadeWindow from "./CascadeWindow";
import LoopManager from "./LoopManager";
import LoopWindow from "./LoopWindow";

export interface BoardProps {}

const Board: React.FC<BoardProps> = props => {
  const { boardCells } = useBoardControls();
  const { pieces, shiftRight } = usePieceControls();

  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <div
      style={{
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column"
      }}
    >
      <LoopManager speed={1} playing={isPlaying} onShift={shiftRight} />
      <LoopWindow boardCells={boardCells} pieces={pieces} />
      <CascadeWindow pieces={pieces} style={{ marginTop: 36 }} />
      <button
        onClick={() => setIsPlaying(prev => !prev)}
        style={{ marginTop: 24 }}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default Board;

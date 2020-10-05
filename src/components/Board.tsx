import React from "react";
import { useBoardControls } from "../hooks/boardControls";
import { usePieceControls } from "../hooks/pieceControls";
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
        height: "100vh"
      }}
    >
      <LoopWindow boardCells={boardCells} pieces={pieces} />
      <LoopManager speed={1} playing={isPlaying} onShift={shiftRight} />
      <button onClick={() => setIsPlaying(prev => !prev)}>
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default Board;

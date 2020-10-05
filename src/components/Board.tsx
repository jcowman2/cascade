import React from "react";
import { useBoardControls } from "../hooks/boardControls";
import { usePieceControls } from "../hooks/pieceControls";
import LoopWindow from "./LoopWindow";

export interface BoardProps {}

const Board: React.FC<BoardProps> = props => {
  const { boardCells } = useBoardControls();
  const { pieces, shiftRight } = usePieceControls();

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
      <button onClick={() => shiftRight()}>Shift Right</button>
    </div>
  );
};

export default Board;

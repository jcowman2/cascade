import React from "react";
/** @jsx jsx */
import { Container, jsx } from "theme-ui";
import { useBoardControls } from "../hooks/boardControls";
import { usePieceControls } from "../hooks/pieceControls";
import LoopWindow from "./LoopWindow";

export interface BoardProps {}

const Board: React.FC<BoardProps> = props => {
  const { boardCells } = useBoardControls();
  const { pieces, shiftRight } = usePieceControls();

  return (
    <Container
      sx={{
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <LoopWindow boardCells={boardCells} pieces={pieces} />
      <button onClick={() => shiftRight()}>Shift Right</button>
    </Container>
  );
};

export default Board;

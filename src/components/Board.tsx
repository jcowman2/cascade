import React from "react";
/** @jsx jsx */
import { Container, jsx } from "theme-ui";
import _range from "lodash.range";
import { ROW_LENGTH, COLUMN_HEIGHT } from "../constants";
import { usePieceControls } from "../hooks/pieceControls";
import LoopWindow from "./LoopWindow";

export interface BoardProps {}

const Board: React.FC<BoardProps> = props => {
  const boardCells = React.useMemo(
    () =>
      _range(0, ROW_LENGTH * COLUMN_HEIGHT).map(n => ({
        slot: n
      })),
    []
  );

  const startState = React.useMemo(
    () => ({
      pieces: [
        {
          id: 0,
          slots: [17, 18, 19, 31],
          color: "primary"
        },
        {
          id: 1,
          slots: [1, 13, 25, 14, 26],
          color: "secondary"
        },
        {
          id: 2,
          slots: [30, 42, 43]
        }
      ]
    }),
    []
  );

  const { pieces, shiftRight } = usePieceControls(startState);

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

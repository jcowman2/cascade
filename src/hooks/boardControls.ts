import React from "react";
import { GameContext } from "../context/GameContext";
import { translatePieceToSlot } from "../utils/gameUtils";

export const useBoardControls = () => {
  const {
    boardCells,
    setWindowPos,
    hoverCell,
    draggingPiece
  } = React.useContext(GameContext);

  const highlightedCells = React.useMemo(() => {
    if (hoverCell === undefined || !draggingPiece) {
      return [];
    }
    return translatePieceToSlot(draggingPiece, hoverCell).slots;
  }, [hoverCell, draggingPiece]);

  return { boardCells, setWindowPos, hoverCell, highlightedCells };
};

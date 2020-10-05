import React from "react";
import { GameContext } from "../context/GameContext";
import { useCanPieceDrop } from "./pieceDrop";

export const useBoardControls = () => {
  const {
    boardCells,
    setWindowPos,
    hoverCell,
    loopSpeed,
    gameEnded
  } = React.useContext(GameContext);
  const { canDrop, potentialSlots } = useCanPieceDrop();

  const highlightedCells = canDrop ? potentialSlots : [];

  return {
    boardCells,
    setWindowPos,
    hoverCell,
    highlightedCells,
    loopSpeed,
    gameEnded
  };
};

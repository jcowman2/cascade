import React from "react";
import { GameContext } from "../context/GameContext";

export const useBoardControls = () => {
  const { boardCells, setWindowPos, hoverCell } = React.useContext(GameContext);
  return { boardCells, setWindowPos, hoverCell };
};

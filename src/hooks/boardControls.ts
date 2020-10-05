import React from "react";
import { GameContext } from "../context/GameContext";

export const useBoardControls = () => {
  const { boardCells } = React.useContext(GameContext);
  return { boardCells };
};

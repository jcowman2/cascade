import React from "react";
import Cell from "../components/Cell";
import { GameContext } from "../context/GameContext";
import { PieceKind } from "../types/game";

const usePieceCellPainter = (
  kindFn: (slot: number) => PieceKind,
  config: { isHidden: boolean } = { isHidden: false }
) => {
  const { cascadeMatchesKey } = React.useContext(GameContext);
  const { isHidden } = config;

  const renderCell = React.useCallback(
    ({ slot }) => {
      const kind = cascadeMatchesKey ? "gold" : kindFn(slot);
      return (
        <Cell
          slot={slot}
          style={isHidden ? { display: "none" } : { backgroundColor: kind }}
        />
      );
    },
    [kindFn, isHidden, cascadeMatchesKey]
  );
  return renderCell;
};

export default usePieceCellPainter;

import React from "react";
import Cell from "../components/Cell";
import { PieceKind } from "../types/game";

const usePieceCellPainter = (
  kindFn: (slot: number) => PieceKind,
  config: { isHidden: boolean } = { isHidden: false }
) => {
  const { isHidden } = config;

  const renderCell = React.useCallback(
    ({ slot }) => {
      const kind = kindFn(slot);
      return (
        <Cell
          slot={slot}
          style={isHidden ? { display: "none" } : { backgroundColor: kind }}
        />
      );
    },
    [kindFn, isHidden]
  );
  return renderCell;
};

export default usePieceCellPainter;

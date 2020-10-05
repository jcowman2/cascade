import React from "react";
import Cell from "../components/Cell";
import { PieceData } from "../types/game";

const usePieceCellPainter = (
  piece: PieceData,
  config: { isHidden: boolean } = { isHidden: false }
) => {
  const { kind } = piece;
  const { isHidden } = config;

  const renderCell = React.useCallback(
    ({ slot }) => (
      <Cell
        slot={slot}
        style={isHidden ? { display: "none" } : { backgroundColor: kind }}
      />
    ),
    [kind, isHidden]
  );
  return renderCell;
};

export default usePieceCellPainter;

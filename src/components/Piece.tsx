import React from "react";
/** @jsx jsx */
import { jsx } from "theme-ui";
import CellLayer from "./CellLayer";
import Cell from "./Cell";

export interface PieceProps {
  slots: number[];
  color: string;
}

const Piece: React.FC<PieceProps> = props => {
  const { slots, color } = props;
  return (
    <CellLayer
      cells={slots.map(slot => ({ slot }))}
      renderCell={({ slot }) => <Cell slot={slot} sx={{ bg: color }} />}
    />
  );
};

export default Piece;

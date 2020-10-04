import React from "react";
import { XYCoord } from "react-dnd";
/** @jsx jsx */
import { jsx } from "theme-ui";
import { CELL_WIDTH, COLUMN_HEIGHT, ROW_LENGTH } from "../constants";
import { PieceData } from "../types/game";
import Cell from "./Cell";
import CellLayer from "./CellLayer";

export interface PiecePreviewProps {
  piece: PieceData;
  offset: XYCoord;
}

const PiecePreview: React.FC<PiecePreviewProps> = props => {
  const { piece, offset } = props;
  const { slots, color } = piece;

  const cells = React.useMemo(() => slots.map(slot => ({ slot })), [slots]);
  const renderCell = React.useCallback(
    ({ slot }) => <Cell slot={slot} sx={{ bg: color }} />,
    [color]
  );

  const xFromCursor = React.useMemo(() => {
    const slotCols = piece.slots.map(slot => slot % ROW_LENGTH);
    const minSlot = Math.min(...slotCols);
    return minSlot * CELL_WIDTH;
  }, [piece]);

  const yFromCursor = React.useMemo(() => {
    const slotRows = piece.slots.map(slot => slot % COLUMN_HEIGHT);
    const minRow = Math.min(...slotRows);
    return minRow * CELL_WIDTH;
  }, [piece]);

  return (
    <div
      sx={{
        position: "fixed",
        top: offset.y - yFromCursor,
        left: offset.x - xFromCursor
      }}
    >
      <CellLayer cells={cells} renderCell={renderCell} />
    </div>
  );
};

export default PiecePreview;

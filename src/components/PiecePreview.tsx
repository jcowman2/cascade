import React from "react";
import { XYCoord } from "react-dnd";
import {
  CELL_WIDTH,
  COLUMN_HEIGHT,
  PIECE_PREVIEW_OFFSET,
  ROW_LENGTH
} from "../constants";
import usePieceCellPainter from "../hooks/pieceCellPainter";
import { PieceData } from "../types/game";
import CellLayer from "./CellLayer";

export interface PiecePreviewProps {
  piece: PieceData;
  offset: XYCoord;
}

const PiecePreview: React.FC<PiecePreviewProps> = props => {
  const { piece, offset } = props;
  const { slots } = piece;

  const cells = React.useMemo(() => {
    try {
      return slots.map(slot => ({ slot }));
    } catch (err) {
      console.error("PiecePreview error", err);
      console.log({ slots });
    }
    return [];
  }, [slots]);
  const getKind = React.useCallback(() => piece.kind, [piece]);
  const renderCell = usePieceCellPainter(getKind);

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
      style={{
        position: "fixed",
        top: offset.y - yFromCursor + PIECE_PREVIEW_OFFSET,
        left: offset.x - xFromCursor + PIECE_PREVIEW_OFFSET
      }}
    >
      <CellLayer cells={cells} renderCell={renderCell} />
    </div>
  );
};

export default PiecePreview;

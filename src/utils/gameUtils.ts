import { XYCoord } from "react-dnd";
import _flatten from "lodash.flatten";
import _groupBy from "lodash.groupby";
import _isEqual from "lodash.isequal";
import { COLUMN_HEIGHT, ROW_LENGTH } from "../constants";
import { CascadeCellData, PieceData } from "../types/game";

const slotNumberToCoord = (slot: number): XYCoord => {
  const row = Math.floor(slot / ROW_LENGTH);
  const col = slot - row * ROW_LENGTH;
  return { x: col, y: row };
};

export const translatePieceToSlot = (
  piece: PieceData,
  slot: number
): PieceData => {
  const dest = slotNumberToCoord(slot);
  const origin = Math.min(...piece.slots);
  const reference = slotNumberToCoord(origin);
  const offsetX = dest.x - reference.x;
  const offsetY = dest.y - reference.y;

  const translated = piece.slots.map(pSlot => {
    const slotOffsetY = pSlot + offsetY * ROW_LENGTH;
    const newRow = Math.floor(slotOffsetY / ROW_LENGTH);
    const newSlot =
      ((slotOffsetY + offsetX) % ROW_LENGTH) + newRow * ROW_LENGTH;
    return newSlot;
  });

  return { ...piece, slots: translated };
};

export const getCascadeView = (
  pieces: PieceData[],
  draggingPiece: PieceData | undefined
): CascadeCellData[] => {
  const accessiblePieces = draggingPiece
    ? pieces.filter(piece => piece.id !== draggingPiece.id)
    : [...pieces];

  const slotKinds = _flatten(
    accessiblePieces.map(piece =>
      piece.slots.map(slot => ({ slot, kind: piece.kind }))
    )
  );
  const slotKindRows = _groupBy(slotKinds, slotKind =>
    Math.floor(slotKind.slot / ROW_LENGTH)
  );
  const cascadeCells: CascadeCellData[] = [];

  for (let col = 0; col < ROW_LENGTH; col++) {
    for (let row = COLUMN_HEIGHT - 1; row >= 0; row--) {
      const slotKindRow = slotKindRows[row];
      if (!slotKindRow) {
        continue;
      }
      const rowCol = slotKindRow.find(
        slotKind => slotKind.slot === col + row * ROW_LENGTH
      );
      if (rowCol) {
        cascadeCells.push({ slot: col, kind: rowCol.kind });
        break;
      }
    }
  }

  return cascadeCells;
};

export const checkCascadeKeyMatch = (
  cascade: CascadeCellData[],
  key: CascadeCellData[]
) => {
  return !!(cascade.length && key.length) && _isEqual(cascade, key);
};

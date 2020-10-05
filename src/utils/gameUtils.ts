import { XYCoord } from "react-dnd";
import { ROW_LENGTH } from "../constants";
import { PieceData } from "../types/game";

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

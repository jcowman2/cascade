import React from "react";
import { ROW_LENGTH } from "../constants";
import { PieceData } from "../types/game";

const translateSlotHoriz = (slot: number, count: number) => {
  const y = Math.floor(slot / ROW_LENGTH);
  const prevX = slot - y * ROW_LENGTH;
  const newX = (prevX + count) % ROW_LENGTH;
  const newSlot = newX + y * ROW_LENGTH;
  return newSlot;
};

export const usePieceControls = (startState: { pieces: PieceData[] }) => {
  const [pieces, setPieces] = React.useState(startState.pieces);

  const shiftRight = (count: number = 1) => {
    setPieces(prevPieces =>
      prevPieces.map(p => {
        const newSlots = p.slots.map(slot => translateSlotHoriz(slot, count));
        // TODO - Split up pieces
        return { ...p, slots: newSlots };
      })
    );
  };

  return { pieces, shiftRight };
};

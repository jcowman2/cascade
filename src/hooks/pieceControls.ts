import React from "react";
import { XYCoord } from "react-dnd";
import { CELL_WIDTH, ROW_LENGTH } from "../constants";
import { GameContext } from "../context/GameContext";
import { PieceData } from "../types/game";

const translateSlotHoriz = (slot: number, count: number) => {
  const y = Math.floor(slot / ROW_LENGTH);
  const prevX = slot - y * ROW_LENGTH;
  const newX = (prevX + count) % ROW_LENGTH;
  const newSlot = newX + y * ROW_LENGTH;
  return newSlot;
};

const calculateHoverCell = (windowPos: XYCoord, offset: XYCoord) => {
  const relX = offset.x - windowPos.x;
  const relY = offset.y - windowPos.y;
  const row = Math.floor(relY / CELL_WIDTH);
  const hoverCell = ROW_LENGTH * row + Math.floor(relX / CELL_WIDTH);
  return hoverCell;
};

export const usePieceControls = () => {
  const {
    pieces,
    setPieces,
    setDraggingPiece,
    windowPos,
    setHoverCell
  } = React.useContext(GameContext);

  const shiftRight = (count: number = 1) => {
    setPieces(prevPieces =>
      prevPieces.map(p => {
        const newSlots = p.slots.map(slot => translateSlotHoriz(slot, count));
        // TODO - Split up pieces
        return { ...p, slots: newSlots };
      })
    );
  };

  // const removePiece = (pieceId: string | number) => {
  //   setPieces(prevPieces => prevPieces.filter(({ id }) => id !== pieceId));
  // };

  const setDragPieceOffset = (piece: PieceData, offset: XYCoord) => {
    setDraggingPiece(piece);
    if (!windowPos) {
      return;
    }
    setHoverCell(calculateHoverCell(windowPos, offset));
  };

  return { pieces, shiftRight, setDragPieceOffset };
};

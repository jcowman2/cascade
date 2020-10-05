import React from "react";
import { XYCoord } from "react-dnd";
import { CELL_WIDTH, ROW_LENGTH } from "../constants";
import { GameContext } from "../context/GameContext";
import { PieceData } from "../types/game";
import { translatePieceToSlot } from "../utils/gameUtils";
import { regroupPieces } from "../utils/regroupPieces";

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
    setHoverCell,
    hoverCell,
    draggingPiece
  } = React.useContext(GameContext);

  const shiftRight = React.useCallback(
    (count: number = 1) => {
      setPieces(prevPieces => {
        const translatedPieces = prevPieces.map(p => {
          const newSlots = p.slots.map(slot => translateSlotHoriz(slot, count));
          return { ...p, slots: newSlots };
        });
        return regroupPieces(translatedPieces, draggingPiece);
      });
    },
    [draggingPiece, setPieces]
  );

  // const removePiece = (pieceId: string | number) => {
  //   setPieces(prevPieces => prevPieces.filter(({ id }) => id !== pieceId));
  // };

  const setDragPieceOffset = React.useCallback(
    (piece: PieceData, offset: XYCoord) => {
      setDraggingPiece(piece);
      if (!windowPos) {
        return;
      }
      setHoverCell(calculateHoverCell(windowPos, offset));
    },
    [setDraggingPiece, setHoverCell, windowPos]
  );

  const cleanupDrag = () => {
    setDraggingPiece(undefined);
    setHoverCell(undefined);
  };

  const handlePieceDropped = (piece: PieceData) => {
    console.log("dropped at", hoverCell);
    if (hoverCell === undefined) {
      console.error("handlePieceDropped", piece, hoverCell);
      return;
    }
    setPieces(prevPieces => {
      const translatedPieces = prevPieces.map(p =>
        p.id === piece.id ? translatePieceToSlot(piece, hoverCell) : p
      );
      return regroupPieces(translatedPieces, undefined);
    });
    cleanupDrag();
  };

  const handlePieceMissed = (piece: PieceData) => {
    console.log("missed at", hoverCell);
    cleanupDrag();
  };

  return {
    pieces,
    shiftRight,
    setDragPieceOffset,
    handlePieceDropped,
    handlePieceMissed
  };
};

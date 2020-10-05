import React from "react";
import { useDrop } from "react-dnd";
import _difference from "lodash.difference";
import { ItemTypes } from "../constants";
import { GameContext } from "../context/GameContext";
import { translatePieceToSlot } from "../utils/gameUtils";

export const useCanPieceDrop = () => {
  const { draggingPiece, hoverCell, availableSlots } = React.useContext(
    GameContext
  );
  let canDrop = false;
  let potentialSlots: number[] = [];

  if (draggingPiece && hoverCell !== undefined) {
    potentialSlots = translatePieceToSlot(draggingPiece, hoverCell).slots;
    const takenSlots = _difference(potentialSlots, availableSlots);
    if (!takenSlots.length) {
      canDrop = true;
    }
  }

  return { canDrop, potentialSlots };
};

export const usePieceDrop = () => {
  const { canDrop } = useCanPieceDrop();

  const [, dropRef] = useDrop({
    accept: ItemTypes.Piece,
    canDrop: () => canDrop
  });

  return { dropRef };
};

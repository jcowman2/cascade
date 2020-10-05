import _groupBy from "lodash.groupby";
import _flatten from "lodash.flatten";
import { ROW_LENGTH } from "../constants";
import { PieceData } from "../types/game";

const newId = (kind: string): string => {
  const str = Math.random().toString(36);
  return `${kind}_${str.substr(2, 8)}`;
};

const takeConnected = (slots: number[]) => {
  if (!slots.length) {
    return [];
  }

  const root = slots.shift()!;

  const stack = [root];
  const piece = new Set<number>();
  piece.add(root);

  while (stack.length) {
    const node = stack.pop()!;
    const adjacent = [node - ROW_LENGTH, node + ROW_LENGTH];
    if (node % ROW_LENGTH > 0) {
      adjacent.push(node - 1);
    }
    if ((node + 1) % ROW_LENGTH > 0) {
      adjacent.push(node + 1);
    }
    for (const adj of adjacent) {
      const idx = slots.findIndex(n => n === adj);
      if (idx > -1) {
        slots.splice(idx, 1);
        stack.push(adj);
        piece.add(adj);
      }
    }
  }

  return Array.from(piece);
};

const splitContinuous = (slots: number[]) => {
  const groups = [];
  while (slots.length > 0) {
    const group = takeConnected(slots);
    groups.push(group);
  }
  return groups;
};

export const regroupPieces = (
  pieces: PieceData[],
  draggingPiece: PieceData | undefined
): PieceData[] => {
  const splittablePieces = draggingPiece
    ? pieces.filter(piece => piece.id !== draggingPiece.id)
    : [...pieces];

  const newPieces: PieceData[] = [];

  const kindGroups = _groupBy(splittablePieces, "kind");
  for (const key in kindGroups) {
    const slotGroup = _flatten(kindGroups[key].map(piece => piece.slots));
    const continuousGroups = splitContinuous(slotGroup);
    continuousGroups
      .map(slots => ({ id: newId("piece"), slots, kind: key }))
      .forEach(piece => newPieces.push(piece));
  }

  return newPieces;
};

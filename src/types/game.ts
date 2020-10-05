import React from "react";

export interface PieceData {
  id: string | number;
  slots: number[];
  kind: PieceKind;
}

export interface CellData {
  slot: number;
}

export type ReactSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export type PieceKind = string;

export interface CascadeCellData {
  slot: number;
  kind: PieceKind;
}

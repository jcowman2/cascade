import React from "react";

export interface PieceData {
  id: string | number;
  slots: number[];
  color?: string;
}

export interface CellData {
  slot: number;
}

export type ReactSetter<T> = React.Dispatch<React.SetStateAction<T>>;

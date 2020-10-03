import React from "react";
import { PieceData } from "../types/game";
import Piece from "./Piece";

export interface PieceLayerProps {
  pieces: PieceData[];
}

const PieceLayer: React.FC<PieceLayerProps> = props => {
  const { pieces } = props;

  return (
    <>
      {pieces.map(piece => (
        <Piece
          key={piece.id}
          slots={piece.slots}
          color={piece.color ?? "text"}
        />
      ))}
    </>
  );
};

export default PieceLayer;

import React from "react";
import { useDragLayer } from "react-dnd";
/** @jsx jsx */
import { jsx } from "theme-ui";
import { PieceData } from "../types/game";
import Piece from "./Piece";
import PiecePreview from "./PiecePreview";

export interface PieceLayerProps {
  pieces: PieceData[];
}

const PieceLayer: React.FC<PieceLayerProps> = props => {
  const { pieces } = props;

  const { item, offset } = useDragLayer(monitor => ({
    item: monitor.getItem() as PieceData | undefined,
    offset: monitor.getClientOffset()
  }));

  const renderedPieces = React.useMemo(
    () =>
      pieces.map(piece => (
        <Piece
          key={piece.id}
          id={piece.id}
          slots={piece.slots}
          color={piece.color ?? "text"}
        />
      )),
    [pieces]
  );

  return (
    <React.Fragment>
      {item && offset && <PiecePreview piece={item} offset={offset} />}
      {renderedPieces}
    </React.Fragment>
  );
};

export default PieceLayer;

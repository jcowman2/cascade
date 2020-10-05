import React from "react";
import { useDragLayer } from "react-dnd";
/** @jsx jsx */
import { jsx } from "theme-ui";
import { GameColors } from "../constants";
import { usePieceControls } from "../hooks/pieceControls";
import { PieceData } from "../types/game";
import Piece from "./Piece";
import PiecePreview from "./PiecePreview";

export interface PieceLayerProps {
  pieces: PieceData[];
}

const PieceLayer: React.FC<PieceLayerProps> = props => {
  const { pieces } = props;
  const { setDragPieceOffset } = usePieceControls();

  const { item, absoluteOffset } = useDragLayer(monitor => ({
    item: monitor.getItem() as PieceData | undefined,
    absoluteOffset: monitor.getClientOffset()
  }));

  if (item && absoluteOffset) {
    setDragPieceOffset(item, absoluteOffset);
  }

  // const renderedPieces = React.useMemo(
  //   () =>
  //     pieces.map(piece => (
  //       <Piece
  //         key={piece.id}
  //         id={piece.id}
  //         slots={piece.slots}
  //         color={piece.color ?? GameColors.text}
  //       />
  //     )),
  //   [pieces]
  // );

  return (
    <React.Fragment>
      {item && absoluteOffset && (
        <PiecePreview piece={item} offset={absoluteOffset} />
      )}
      {pieces.map(piece => (
        <Piece
          key={piece.id}
          id={piece.id}
          slots={piece.slots}
          color={piece.color ?? GameColors.text}
        />
      ))}
    </React.Fragment>
  );
};

export default PieceLayer;

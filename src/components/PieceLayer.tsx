import React from "react";
import { useDragLayer } from "react-dnd";
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

  React.useEffect(() => {
    if (item && absoluteOffset) {
      setDragPieceOffset(item, absoluteOffset);
    }
  }, [item, absoluteOffset, setDragPieceOffset]);

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
          kind={piece.kind}
        />
      ))}
    </React.Fragment>
  );
};

export default PieceLayer;

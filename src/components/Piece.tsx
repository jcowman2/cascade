import React from "react";
import { useDrag } from "react-dnd";
import CellLayer from "./CellLayer";
import { ItemTypes } from "../constants";
import { getEmptyImage } from "react-dnd-html5-backend";
import { PieceData } from "../types/game";
import { usePieceControls } from "../hooks/pieceControls";
import { usePieceDrop } from "../hooks/pieceDrop";
import usePieceCellPainter from "../hooks/pieceCellPainter";

export interface PieceProps extends PieceData {}

const Piece: React.FC<PieceProps> = props => {
  const { slots, kind, id } = props;
  const { handlePieceDropped, handlePieceMissed } = usePieceControls();
  const { dropRef } = usePieceDrop();

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.Piece, slots, kind, id },
    end: (item, monitor) => {
      if (!item) {
        return;
      }
      const didDrop = monitor.didDrop();
      if (didDrop) {
        handlePieceDropped(item);
      } else {
        handlePieceMissed(item);
      }
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  React.useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  const cells = React.useMemo(() => slots.map(slot => ({ slot })), [slots]);
  const getKind = React.useCallback(() => kind, [kind]);
  const renderCell = usePieceCellPainter(getKind, { isHidden: isDragging });

  function doubleRef(el: any) {
    drag(el);
    dropRef(el);
  }

  return (
    <React.Fragment>
      <div
        ref={doubleRef}
        style={{
          cursor: "move",
          position: "absolute"
        }}
      >
        <CellLayer cells={cells} renderCell={renderCell} />
      </div>
    </React.Fragment>
  );
};

export default Piece;

import React from "react";
import { useDrag } from "react-dnd";
import CellLayer from "./CellLayer";
import Cell from "./Cell";
import { ItemTypes } from "../constants";
import { getEmptyImage } from "react-dnd-html5-backend";
import { PieceData } from "../types/game";
import { usePieceControls } from "../hooks/pieceControls";
import { usePieceDrop } from "../hooks/pieceDrop";

export interface PieceProps extends PieceData {}

const Piece: React.FC<PieceProps> = props => {
  const { slots, color, id } = props;
  const { handlePieceDropped, handlePieceMissed } = usePieceControls();
  const { dropRef } = usePieceDrop();

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.Piece, slots, color, id },
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
  const renderCell = React.useCallback(
    ({ slot }) => (
      <Cell
        slot={slot}
        style={
          isDragging
            ? { display: "none" }
            : {
                backgroundColor: color
              }
        }
      />
    ),
    [color, isDragging]
  );

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

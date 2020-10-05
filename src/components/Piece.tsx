import React from "react";
import { useDrag } from "react-dnd";
import CellLayer from "./CellLayer";
import Cell from "./Cell";
import { ItemTypes } from "../constants";
import { getEmptyImage } from "react-dnd-html5-backend";
import { PieceData } from "../types/game";

export interface PieceProps extends PieceData {}

const Piece: React.FC<PieceProps> = props => {
  const { slots, color, id } = props;

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.Piece, slots, color },
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
        style={{ backgroundColor: color, opacity: isDragging ? 0 : 1 }}
      />
    ),
    [color, isDragging]
  );

  return (
    <React.Fragment>
      <div
        ref={drag}
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

import React from "react";
/** @jsx jsx */
import { jsx } from "theme-ui";
import { useDrag } from "react-dnd";
import CellLayer from "./CellLayer";
import Cell from "./Cell";
import { ItemTypes } from "../constants";

export interface PieceProps {
  slots: number[];
  color: string;
}

const Piece: React.FC<PieceProps> = props => {
  const { slots, color } = props;

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.Piece },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return (
    <div
      ref={drag}
      sx={{
        cursor: "move",
        position: "absolute"
      }}
    >
      <CellLayer
        cells={slots.map(slot => ({ slot }))}
        renderCell={({ slot }) => (
          <Cell slot={slot} sx={{ bg: color, opacity: isDragging ? 0 : 1 }} />
        )}
      />
    </div>
  );
};

export default Piece;

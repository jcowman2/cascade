import React from "react";
/** @jsx jsx */
import { jsx } from "theme-ui";
import { DragPreviewImage, useDrag } from "react-dnd";
import CellLayer from "./CellLayer";
import Cell from "./Cell";
import { ItemTypes } from "../constants";

export interface PieceProps {
  slots: number[];
  color: string;
}

const Piece: React.FC<PieceProps> = props => {
  const { slots, color } = props;

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.Piece },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return (
    <React.Fragment>
      <DragPreviewImage
        connect={preview}
        src={`https://avatars0.githubusercontent.com/u/21223537?s=460&u=03e0e1d38032b1a8bf9561643588e35f498856e5&v=4`}
      />
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
    </React.Fragment>
  );
};

export default Piece;

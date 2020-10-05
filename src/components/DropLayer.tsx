import React from "react";
import { useDrop } from "react-dnd";
import { GameColors, ItemTypes } from "../constants";
import { useBoardControls } from "../hooks/boardControls";
import { CellData } from "../types/game";
import Cell from "./Cell";
import CellLayer from "./CellLayer";

export interface DropLayerProps {
  cells: CellData[];
}

const DropLayer: React.FC<DropLayerProps> = props => {
  const { cells } = props;
  const { hoverCell } = useBoardControls();

  const [, drop] = useDrop({
    accept: ItemTypes.Piece
  });

  return (
    <div ref={drop}>
      <CellLayer
        cells={cells}
        renderCell={({ slot }) => (
          <Cell
            slot={slot}
            style={{
              backgroundColor:
                slot === hoverCell ? GameColors.highlight : undefined,
              opacity: 0.5
            }}
          />
        )}
      />
    </div>
  );
};

export default DropLayer;

import React from "react";
import { GameColors } from "../constants";
import { useBoardControls } from "../hooks/boardControls";
import { usePieceDrop } from "../hooks/pieceDrop";
import { CellData } from "../types/game";
import Cell from "./Cell";
import CellLayer from "./CellLayer";

export interface DropLayerProps {
  cells: CellData[];
}

const DropLayer: React.FC<DropLayerProps> = props => {
  const { cells } = props;
  const { highlightedCells } = useBoardControls();
  const { dropRef } = usePieceDrop();

  return (
    <div ref={dropRef}>
      <CellLayer
        cells={cells}
        renderCell={({ slot }) => (
          <Cell
            key={slot}
            slot={slot}
            style={{
              backgroundColor: highlightedCells.includes(slot)
                ? GameColors.highlight
                : "inherit",
              opacity: 0.5
            }}
          />
        )}
      />
    </div>
  );
};

export default DropLayer;

import React from "react";
import { CELL_WIDTH, ROW_LENGTH } from "../constants";
import { CellData } from "../types/game";

export interface CellLayerProps {
  cells: CellData[];
  renderCell: React.FC<CellData>;
}

const CellLayer: React.FC<CellLayerProps> = props => {
  const { cells, renderCell } = props;

  return (
    <div style={{ position: "absolute" }}>
      {cells.map(cellData => {
        const { slot } = cellData;
        const y = Math.floor(slot / ROW_LENGTH);
        const x = slot - y * ROW_LENGTH;
        return (
          <div
            key={slot}
            style={{
              position: "absolute",
              top: y * CELL_WIDTH,
              left: x * CELL_WIDTH,
              width: CELL_WIDTH,
              height: CELL_WIDTH
            }}
          >
            {renderCell(cellData)}
          </div>
        );
      })}
    </div>
  );
};

// export default React.memo(CellLayer);
export default CellLayer;

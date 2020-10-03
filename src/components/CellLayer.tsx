import React from "react";
/** @jsx jsx */
import { jsx, Box } from "theme-ui";
import { CELL_WIDTH, COLUMN_HEIGHT, ROW_LENGTH } from "../constants";

export interface CellData {
  slot: number;
}

export interface CellLayerProps {
  cells: CellData[];
  renderCell: React.FC<CellData>;
}

const CellLayer: React.FC<CellLayerProps> = props => {
  const { cells, renderCell } = props;

  return (
    <Box sx={{ width: "100%", height: "100%", position: "absolute" }}>
      {cells.map(cellData => {
        const { slot } = cellData;
        const y = Math.floor(slot / ROW_LENGTH);
        const x = slot - y * ROW_LENGTH;
        return (
          <Box
            key={slot}
            sx={{
              position: "absolute",
              top: y * CELL_WIDTH,
              left: x * CELL_WIDTH,
              width: CELL_WIDTH,
              height: CELL_WIDTH
            }}
          >
            {renderCell(cellData)}
          </Box>
        );
      })}
    </Box>
  );
};

export default CellLayer;

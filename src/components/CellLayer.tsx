import React from "react";
/** @jsx jsx */
import { jsx, Box } from "theme-ui";
import { CELL_WIDTH, ROW_LENGTH } from "../constants";
import { CellData } from "../types/game";

export interface CellLayerProps {
  cells: CellData[];
  renderCell: React.FC<CellData>;
}

const CellLayer: React.FC<CellLayerProps> = props => {
  const { cells, renderCell } = props;
  console.log("re-rendering");

  return (
    <Box sx={{ position: "absolute" }}>
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

export default React.memo(CellLayer);

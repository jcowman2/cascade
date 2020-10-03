import React from "react";
/** @jsx jsx */
import { jsx, Box } from "theme-ui";
import _range from "lodash.range";
import { CELL_WIDTH, COLUMN_HEIGHT, ROW_LENGTH } from "../constants";
import Cell from "./Cell";
import CellLayer from "./CellLayer";
import Piece from "./Piece";

export interface LoopWindowProps {}

const LoopWindow: React.FC<LoopWindowProps> = props => {
  const width = CELL_WIDTH * ROW_LENGTH;
  const height = CELL_WIDTH * COLUMN_HEIGHT;

  return (
    <Box
      sx={{
        width,
        height,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "text"
      }}
    >
      <CellLayer
        cells={_range(0, ROW_LENGTH * COLUMN_HEIGHT).map(n => ({
          slot: n
        }))}
        renderCell={({ slot }) => (
          <Cell
            slot={slot}
            showLabel
            sx={{
              borderWidth: 1,
              borderColor: "text",
              borderStyle: "dashed",
              opacity: 0.5
            }}
          />
        )}
      />
      <Piece slots={[17, 18, 19, 31]} color="primary" />
      <Piece slots={[1, 13, 25, 14, 26]} color="secondary" />
    </Box>
  );
};

export default LoopWindow;

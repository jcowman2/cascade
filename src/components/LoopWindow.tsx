import React from "react";
/** @jsx jsx */
import { jsx, Box, Flex } from "theme-ui";
import _range from "lodash.range";
import { CELL_WIDTH, COLUMN_HEIGHT, ROW_LENGTH } from "../constants";
import Cell from "./Cell";
import CellLayer from "./CellLayer";

export interface LoopWindowProps {}

const LoopWindow: React.FC<LoopWindowProps> = props => {
  const width = CELL_WIDTH * ROW_LENGTH;
  const height = CELL_WIDTH * COLUMN_HEIGHT;

  // const cells1 = _range(0, COLUMN_HEIGHT).map(y => (
  //   <Flex key={`row_${y}`}>
  //     {_range(0, ROW_LENGTH).map(x => {
  //       const num = y * ROW_LENGTH + x;
  //       return <Cell key={num} id={String(num)} />;
  //     })}
  //   </Flex>
  // ));

  const fullLayer = _range(0, ROW_LENGTH * COLUMN_HEIGHT).map(n => ({
    slot: n
  }));

  fullLayer.splice(16, 2);

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
        cells={fullLayer}
        renderCell={({ slot }) => <Cell id={String(slot)} />}
      />
    </Box>
  );
};

export default LoopWindow;

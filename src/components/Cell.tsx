import React from "react";
/** @jsx jsx */
import { jsx, Box, Text } from "theme-ui";
import { CELL_WIDTH } from "../constants";

export interface CellProps {
  id: string;
}

const Cell: React.FC<CellProps> = props => {
  const width = CELL_WIDTH;
  return (
    <Box
      sx={{
        width,
        height: width,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "text",
        borderStyle: "dashed",
        opacity: 0.5
      }}
    >
      <Text>{props.id}</Text>
    </Box>
  );
};

export default Cell;

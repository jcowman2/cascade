import React from "react";
/** @jsx jsx */
import { jsx, Box, Text } from "theme-ui";
import { CELL_WIDTH } from "../constants";

export interface CellProps {
  slot: number;
  style?: React.CSSProperties;
  showLabel?: boolean;
}

const Cell: React.FC<CellProps> = props => {
  const { slot, style = {}, showLabel = false } = props;
  const width = CELL_WIDTH;
  return (
    <Box
      style={{
        width,
        height: width,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...style
      }}
    >
      {showLabel && <Text>{slot}</Text>}
    </Box>
  );
};

export default Cell;

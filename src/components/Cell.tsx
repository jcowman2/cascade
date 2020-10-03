import React from "react";
/** @jsx jsx */
import { jsx, Box, Text } from "theme-ui";
import { CELL_WIDTH } from "../constants";

export interface CellProps {
  slot: number;
  className?: string;
  showLabel?: boolean;
}

const Cell: React.FC<CellProps> = props => {
  const { slot, className, showLabel = false } = props;
  const width = CELL_WIDTH;
  return (
    <Box
      className={className}
      sx={{
        width,
        height: width,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {showLabel && <Text>{slot}</Text>}
    </Box>
  );
};

export default Cell;

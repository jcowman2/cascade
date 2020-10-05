import React from "react";
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
    <div
      style={{
        width,
        height: width,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...style
      }}
    >
      {showLabel && <span>{slot}</span>}
    </div>
  );
};

export default Cell;

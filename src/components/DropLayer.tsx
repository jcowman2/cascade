import React from "react";
import { CellData } from "../types/game";
import DropLayerCell from "./DropLayerCell";

export interface DropLayerProps {
  cells: CellData[];
}

const DropLayer: React.FC<DropLayerProps> = props => {
  const { cells } = props;

  return (
    <React.Fragment>
      {cells.map(cell => (
        <DropLayerCell key={cell.slot} cell={cell} />
      ))}
    </React.Fragment>
  );
};

export default DropLayer;

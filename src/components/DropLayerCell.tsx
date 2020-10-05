import React from "react";
import { useDrop } from "react-dnd";
/** @jsx jsx */
import { jsx } from "theme-ui";
import { ItemTypes } from "../constants";
import { CellData } from "../types/game";
import Cell from "./Cell";
import CellLayer from "./CellLayer";

export interface DropLayerCellProps {
  cell: CellData;
}

const DropLayerCell: React.FC<DropLayerCellProps> = props => {
  const { cell } = props;
  // console.log("DropLayerCell");

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.Piece,
    drop: () => console.log("dropped!", cell),
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });

  const cells = React.useMemo(() => [cell], [cell]);
  const renderCell = React.useCallback(
    ({ slot }) => (
      <Cell
        slot={slot}
        sx={{ bg: isOver ? "gold" : undefined, opacity: 0.5 }}
      />
    ),
    [isOver]
  );

  return (
    <div ref={drop}>
      <CellLayer cells={cells} renderCell={renderCell} />
    </div>
  );
};

export default DropLayerCell;

import React from "react";
import { CELL_WIDTH, COLUMN_HEIGHT, ROW_LENGTH, SHOW_GRID } from "../constants";
import Cell from "./Cell";
import CellLayer from "./CellLayer";
import PieceLayer from "./PieceLayer";
import DropLayer from "./DropLayer";
import { CellData, PieceData } from "../types/game";
import useRectPoller from "../hooks/rectPoller";
import { useBoardControls } from "../hooks/boardControls";

export interface LoopWindowProps {
  boardCells: CellData[];
  pieces: PieceData[];
}

const LoopWindow: React.FC<LoopWindowProps> = props => {
  const { boardCells, pieces } = props;
  const { setWindowPos } = useBoardControls();
  const { top, left, divRef } = useRectPoller();

  React.useEffect(() => {
    if (top === undefined || left === undefined) {
      return;
    }
    setWindowPos({ x: left, y: top });
  }, [top, left, setWindowPos]);

  const width = CELL_WIDTH * ROW_LENGTH;
  const height = CELL_WIDTH * COLUMN_HEIGHT;

  const dashLayerRenderCell = React.useCallback(
    ({ slot }) => (
      <Cell
        slot={slot}
        showLabel={SHOW_GRID}
        style={
          SHOW_GRID
            ? {
                borderWidth: 1,
                borderColor: "text",
                borderStyle: "dashed",
                opacity: 0.5
              }
            : undefined
        }
      />
    ),
    []
  );

  return (
    <div
      style={{
        width,
        height,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "text"
      }}
      ref={divRef}
    >
      <CellLayer cells={boardCells} renderCell={dashLayerRenderCell} />
      <DropLayer cells={boardCells} />
      <PieceLayer pieces={pieces} />
    </div>
  );
};

export default LoopWindow;

import React from "react";
import { CELL_WIDTH, ROW_LENGTH } from "../constants";
import CellLayer from "./CellLayer";
import usePieceCellPainter from "../hooks/pieceCellPainter";
import { GameContext } from "../context/GameContext";

export interface CascadeWindowProps {
  style?: React.CSSProperties;
}

const CascadeWindow: React.FC<CascadeWindowProps> = props => {
  const { style = {} } = props;
  const { cascadeView } = React.useContext(GameContext);

  const width = CELL_WIDTH * ROW_LENGTH;
  const height = CELL_WIDTH;

  const getKind = React.useCallback(
    (slot: number) => cascadeView.find(cell => cell.slot === slot)!.kind,
    [cascadeView]
  );
  const renderCell = usePieceCellPainter(getKind);

  return (
    <div
      style={{
        width,
        height,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "text",
        ...style
      }}
    >
      <CellLayer cells={cascadeView} renderCell={renderCell} />
    </div>
  );
};

export default CascadeWindow;

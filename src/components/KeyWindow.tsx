import React from "react";
import { CELL_WIDTH, ROW_LENGTH } from "../constants";
import { GameContext } from "../context/GameContext";
import usePieceCellPainter from "../hooks/pieceCellPainter";
import CellLayer from "./CellLayer";

export interface KeyWindowProps {
  style?: React.CSSProperties;
}

const KeyWindow: React.FC<KeyWindowProps> = props => {
  const { style } = props;
  const { key } = React.useContext(GameContext);

  const width = CELL_WIDTH * ROW_LENGTH;
  const height = CELL_WIDTH;

  const getKind = React.useCallback(
    (slot: number) => key.find(cell => cell.slot === slot)!.kind,
    [key]
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
      <CellLayer cells={key} renderCell={renderCell} />
    </div>
  );
};

export default KeyWindow;

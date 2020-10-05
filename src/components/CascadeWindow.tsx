import React from "react";
import { CELL_WIDTH, ROW_LENGTH } from "../constants";
import { PieceData } from "../types/game";
import { getCascadeView } from "../utils/gameUtils";
import CellLayer from "./CellLayer";
import usePieceCellPainter from "../hooks/pieceCellPainter";
import { useDraggingPiece } from "../hooks/pieceControls";

export interface CascadeWindowProps {
  pieces: PieceData[];
  style?: React.CSSProperties;
}

const CascadeWindow: React.FC<CascadeWindowProps> = props => {
  const { pieces, style = {} } = props;
  const draggingPiece = useDraggingPiece();

  const width = CELL_WIDTH * ROW_LENGTH;
  const height = CELL_WIDTH;

  const cascadeView = React.useMemo(() => {
    return getCascadeView(pieces, draggingPiece);
  }, [pieces, draggingPiece]);
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

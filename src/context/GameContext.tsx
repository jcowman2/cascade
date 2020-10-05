import React from "react";
import _range from "lodash.range";
import _flatten from "lodash.flatten";
import _difference from "lodash.difference";
import { ROW_LENGTH, COLUMN_HEIGHT, GameColors } from "../constants";
import { CellData, PieceData, ReactSetter } from "../types/game";
import { XYCoord } from "react-dnd";

export interface GameContextProps {
  boardCells: CellData[];
  pieces: PieceData[];
  setPieces: ReactSetter<PieceData[]>;
  windowPos?: XYCoord;
  setWindowPos: ReactSetter<XYCoord | undefined>;
  draggingPiece?: PieceData;
  setDraggingPiece: ReactSetter<PieceData | undefined>;
  hoverCell?: number;
  setHoverCell: ReactSetter<number | undefined>;
  availableSlots: number[];
}

export const GameContext = React.createContext<GameContextProps>({
  boardCells: [],
  pieces: [],
  setPieces: () => {},
  setWindowPos: () => {},
  setDraggingPiece: () => {},
  setHoverCell: () => {},
  availableSlots: []
});

const FULL_BOARD: CellData[] = _range(0, ROW_LENGTH * COLUMN_HEIGHT).map(n => ({
  slot: n
}));

const DEFAULT_PIECES: PieceData[] = [
  {
    id: 0,
    slots: [17, 18, 19, 31],
    color: GameColors.primary
  },
  {
    id: 1,
    slots: [1, 13, 25, 14, 26],
    color: GameColors.secondary
  },
  {
    id: 2,
    slots: [30, 42, 43]
  }
];

export const GameContextProvider: React.FC = props => {
  const [boardCells, setBoardCells] = React.useState(FULL_BOARD);
  const [pieces, setPieces] = React.useState(DEFAULT_PIECES);
  const [windowPos, setWindowPos] = React.useState<XYCoord>();
  const [draggingPiece, setDraggingPiece] = React.useState<PieceData>();
  const [hoverCell, setHoverCell] = React.useState<number>();

  const availableSlots = React.useMemo(() => {
    const draggingId = draggingPiece?.id;
    const takenSlots = _flatten(
      pieces.map(piece => (piece.id === draggingId ? [] : piece.slots))
    );
    const allSlots = boardCells.map(({ slot }) => slot);
    return _difference(allSlots, takenSlots);
  }, [draggingPiece, pieces, boardCells]);

  return (
    <GameContext.Provider
      value={{
        boardCells,
        pieces,
        setPieces,
        windowPos,
        setWindowPos,
        draggingPiece,
        setDraggingPiece,
        hoverCell,
        setHoverCell,
        availableSlots
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

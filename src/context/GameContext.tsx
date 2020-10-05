import React from "react";
import _range from "lodash.range";
import _flatten from "lodash.flatten";
import _difference from "lodash.difference";
import { ROW_LENGTH, COLUMN_HEIGHT, GameColors } from "../constants";
import {
  CascadeCellData,
  CellData,
  PieceData,
  ReactSetter
} from "../types/game";
import { XYCoord } from "react-dnd";
import { checkCascadeKeyMatch, getCascadeView } from "../utils/gameUtils";

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
  key: CascadeCellData[];
  cascadeView: CascadeCellData[];
  cascadeMatchesKey: boolean;
}

export const GameContext = React.createContext<GameContextProps>({
  boardCells: [],
  pieces: [],
  setPieces: () => {},
  setWindowPos: () => {},
  setDraggingPiece: () => {},
  setHoverCell: () => {},
  availableSlots: [],
  key: [],
  cascadeView: [],
  cascadeMatchesKey: false
});

const FULL_BOARD: CellData[] = _range(0, ROW_LENGTH * COLUMN_HEIGHT).map(n => ({
  slot: n
}));

const DEFAULT_PIECES: PieceData[] = [
  {
    id: 0,
    slots: [17, 18, 19, 31],
    kind: GameColors.primary
  },
  {
    id: 1,
    slots: [1, 13, 25, 14, 26],
    kind: GameColors.primary
  },
  {
    id: 2,
    slots: [30, 42, 43],
    kind: GameColors.text
  }
];

const DEFAULT_KEY: CascadeCellData[] = [
  {
    slot: 1,
    kind: GameColors.primary
  },
  {
    slot: 2,
    kind: GameColors.primary
  },
  {
    slot: 3,
    kind: GameColors.text
  },
  {
    slot: 4,
    kind: GameColors.text
  },
  {
    slot: 5,
    kind: GameColors.primary
  },
  {
    slot: 6,
    kind: GameColors.primary
  }
];

export const GameContextProvider: React.FC = props => {
  const [boardCells, setBoardCells] = React.useState(FULL_BOARD);
  const [pieces, setPieces] = React.useState(DEFAULT_PIECES);
  const [windowPos, setWindowPos] = React.useState<XYCoord>();
  const [draggingPiece, setDraggingPiece] = React.useState<PieceData>();
  const [hoverCell, setHoverCell] = React.useState<number>();
  const [key, setKey] = React.useState(DEFAULT_KEY);

  const availableSlots = React.useMemo(() => {
    const draggingId = draggingPiece?.id;
    const takenSlots = _flatten(
      pieces.map(piece => (piece.id === draggingId ? [] : piece.slots))
    );
    const allSlots = boardCells.map(({ slot }) => slot);
    return _difference(allSlots, takenSlots);
  }, [draggingPiece, pieces, boardCells]);

  const cascadeView = React.useMemo(() => {
    return getCascadeView(pieces, draggingPiece);
  }, [pieces, draggingPiece]);
  const cascadeMatchesKey = React.useMemo(() => {
    return checkCascadeKeyMatch(cascadeView, key);
  }, [cascadeView, key]);

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
        availableSlots,
        key,
        cascadeView,
        cascadeMatchesKey
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

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
import { useLevelManager } from "../hooks/gameControls";

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

export const GameContextProvider: React.FC = props => {
  const [boardCells, setBoardCells] = React.useState<CellData[]>([]);
  const [pieces, setPieces] = React.useState<PieceData[]>([]);
  const [key, setKey] = React.useState<CascadeCellData[]>([]);

  const { goToNextLevel } = useLevelManager(setBoardCells, setPieces, setKey);

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

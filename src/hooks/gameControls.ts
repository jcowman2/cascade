import React from "react";
import { Levels } from "../data/levels";
import {
  ReactSetter,
  CellData,
  CascadeCellData,
  PieceData
} from "../types/game";

export const useLevelManager = (
  setBoardCells: ReactSetter<CellData[]>,
  setPieces: ReactSetter<PieceData[]>,
  setKey: ReactSetter<CascadeCellData[]>
) => {
  const [levelNum, setLevelNum] = React.useState(0);

  const level = React.useMemo(() => {
    const { board, pieces, key } = Levels[levelNum];
    return {
      board: [...board],
      pieces: [...pieces],
      key: [...key]
    };
  }, [levelNum]);

  React.useEffect(() => {
    setBoardCells(level.board);
    setPieces(level.pieces);
    setKey(level.key);
  }, [level, setBoardCells, setPieces, setKey]);

  const goToNextLevel = () => {
    setLevelNum(prev => prev + 1);
  };

  return { level, goToNextLevel };
};

export const useWatchMatch = (cascadeMatchesKey: boolean) => {
  React.useEffect(() => {
    if (!cascadeMatchesKey) {
      return;
    }
  }, [cascadeMatchesKey]);
};

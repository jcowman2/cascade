import React from "react";
import { Levels } from "../data/levels";
import {
  ReactSetter,
  CellData,
  CascadeCellData,
  PieceData,
  Level
} from "../types/game";

export const useLevelManager = (
  setBoardCells: ReactSetter<CellData[]>,
  setPieces: ReactSetter<PieceData[]>,
  setKey: ReactSetter<CascadeCellData[]>,
  onGameEnd: () => void
) => {
  const [levelNum, setLevelNum] = React.useState(0);
  const [loopSpeed, setLoopSpeed] = React.useState(0);

  const level: Level = React.useMemo(() => {
    let num = levelNum;
    if (num >= Levels.length) {
      console.log("num is too high", num);
      num = Levels.length - 1;
    }
    const { board, pieces, key } = Levels[num];
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
    setLoopSpeed(1);
  }, [level, setBoardCells, setPieces, setKey]);

  const goToNextLevel = () => {
    if (levelNum === Levels.length - 1) {
      onGameEnd();
    } else {
      setLevelNum(prev => prev + 1);
    }
  };

  return { level, goToNextLevel, loopSpeed, setLoopSpeed };
};

export const useWatchMatch = (
  cascadeMatchesKey: boolean,
  setLoopSpeed: ReactSetter<number>,
  goToNextLevel: () => void
) => {
  const [hasHandled, setHasHandled] = React.useState(true);

  const onEnd = React.useCallback(() => {
    setLoopSpeed(0);
    setTimeout(goToNextLevel, 1000);
  }, [setLoopSpeed, goToNextLevel]);

  React.useEffect(() => {
    if (!cascadeMatchesKey) {
      return;
    }
    setHasHandled(false);
  }, [cascadeMatchesKey]);

  React.useEffect(() => {
    if (hasHandled) {
      return;
    }
    onEnd();
    setHasHandled(true);
  }, [hasHandled, onEnd]);
};

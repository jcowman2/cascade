import _range from "lodash.range";
import { ROW_LENGTH, COLUMN_HEIGHT, GameColors } from "../constants";
import { CellData, Level } from "../types/game";

const FULL_BOARD: CellData[] = _range(0, ROW_LENGTH * COLUMN_HEIGHT).map(n => ({
  slot: n
}));

const Box = {
  board: FULL_BOARD,
  pieces: [
    {
      id: 0,
      slots: [17, 18],
      kind: GameColors.primary
    },
    {
      id: 1,
      slots: [29, 30],
      kind: GameColors.text
    }
  ],
  key: [
    {
      slot: 5,
      kind: GameColors.primary
    },
    {
      slot: 6,
      kind: GameColors.primary
    },
    {
      slot: 7,
      kind: GameColors.text
    }
  ]
};

const Ribbon = {
  board: FULL_BOARD,
  pieces: [
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
  ],
  key: [
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
  ]
};

export const Levels: Level[] = [Box, Ribbon];

import { system as preset, system } from "@theme-ui/presets";
import { ColorMode } from "theme-ui";

export const CELL_WIDTH = 80;
export const ROW_LENGTH = 12;
export const COLUMN_HEIGHT = 4;
export const PIECE_PREVIEW_OFFSET = 24;

export const ItemTypes = {
  Piece: "piece"
};

const ThemeUIColors = preset.colors! as Required<ColorMode>;

export const GameColors = {
  ...ThemeUIColors,
  highlight: "gold"
};

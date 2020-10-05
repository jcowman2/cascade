import { system as preset } from "@theme-ui/presets";
import { ColorMode } from "theme-ui";

export const CELL_WIDTH = 70;
export const ROW_LENGTH = 12;
export const COLUMN_HEIGHT = 4;
export const PIECE_PREVIEW_OFFSET = 24;
export const SHOW_GRID = true;

export const ItemTypes = {
  Piece: "piece"
};

const ThemeUIColors = preset.colors! as Required<ColorMode>;

export const GameColors = {
  ...ThemeUIColors,
  highlight: "gold"
};

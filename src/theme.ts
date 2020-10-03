import { system as preset } from "@theme-ui/presets";
import { merge } from "theme-ui";
import { CELL_WIDTH } from "./constants";

export default merge(preset, {
  colors: {
    // background: "#f6f6f6"
  },
  sizes: {
    cellWidth: CELL_WIDTH
  }
});

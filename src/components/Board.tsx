import React from "react";
import { useBoardControls } from "../hooks/boardControls";
import { usePieceControls } from "../hooks/pieceControls";
import CascadeWindow from "./CascadeWindow";
import Hero from "./Hero";
import KeyWindow from "./KeyWindow";
import LoopManager from "./LoopManager";
import LoopWindow from "./LoopWindow";

export interface BoardProps {}

const Board: React.FC<BoardProps> = props => {
  const { boardCells, loopSpeed } = useBoardControls();
  const { pieces, shiftRight } = usePieceControls();

  const isPlaying = !!loopSpeed;

  return (
    <Hero>
      <LoopManager speed={loopSpeed} playing={isPlaying} onShift={shiftRight} />

      <KeyWindow style={{ marginBottom: 36 }} />
      <LoopWindow boardCells={boardCells} pieces={pieces} />
      <CascadeWindow style={{ marginTop: 36 }} />
    </Hero>
  );
};

export default Board;

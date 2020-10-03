import React from "react";
/** @jsx jsx */
import { Container, jsx } from "theme-ui";
import LoopWindow from "./LoopWindow";

export interface BoardProps {}

const Board: React.FC<BoardProps> = props => {
  return (
    <Container
      sx={{
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <LoopWindow />
    </Container>
  );
};

export default Board;

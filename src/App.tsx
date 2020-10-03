import React from "react";
/** @jsx jsx */
import { jsx, ThemeProvider, Container } from "theme-ui";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import theme from "./theme";
import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DndProvider backend={HTML5Backend}>
        <Container>
          <Board />
        </Container>
      </DndProvider>
    </ThemeProvider>
  );
}

export default App;

import React from "react";
/** @jsx jsx */
import { jsx, ThemeProvider, Container } from "theme-ui";
import theme from "./theme";
import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Board />
      </Container>
    </ThemeProvider>
  );
}

export default App;

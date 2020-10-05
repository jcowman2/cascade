import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import Board from "./components/Board";
import WelcomePage from "./components/WelcomePage";
import { GameContextProvider } from "./context/GameContext";
import { ScreenId } from "./types/game";

function App() {
  const [screen, setScreen] = React.useState<ScreenId>(ScreenId.Welcome);
  let screenElement = null;

  const startGame = () => setScreen(ScreenId.Game);

  switch (screen) {
    case ScreenId.Welcome:
      screenElement = <WelcomePage onStart={startGame} />;
      break;
    default:
      screenElement = <Board />;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <GameContextProvider>
        <div>{screenElement}</div>
      </GameContextProvider>
    </DndProvider>
  );
}

export default App;

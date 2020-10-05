import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import Board from "./components/Board";
import EndPage from "./components/EndPage";
import WelcomePage from "./components/WelcomePage";
import { GameContextProvider } from "./context/GameContext";
import { ScreenId } from "./types/game";

function App() {
  const [screen, setScreen] = React.useState<ScreenId>(ScreenId.Welcome);
  let screenElement = null;

  const startGame = () => setScreen(ScreenId.Game);
  const endGame = () => setScreen(ScreenId.End);

  switch (screen) {
    case ScreenId.Welcome:
      screenElement = <WelcomePage onStart={startGame} />;
      break;
    case ScreenId.End:
      screenElement = <EndPage />;
      break;
    case ScreenId.Game:
    default:
      screenElement = <Board onGameEnd={endGame} />;
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

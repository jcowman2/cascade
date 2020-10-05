import React from "react";
import { GameColors } from "../constants";
import Hero from "./Hero";

export interface WelcomePageProps {
  onStart: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = props => {
  return (
    <Hero>
      <h1 style={{ fontSize: "6em", marginBottom: 0 }}>Cascade</h1>
      <p>Created in one weekend for Ludum Dare 47</p>
      <div style={{ marginBottom: 24 }}>
        <h2>Instructions:</h2>
        <ul>
          <li>Drag and drop pieces on the board with the mouse</li>
          <li>
            Colors cascade down vertically, collecting at the bottom of the
            board
          </li>
          <li>Make the bottom window match the key at the top of the board</li>
        </ul>
      </div>
      <button
        onClick={props.onStart}
        style={{
          fontSize: "2em",
          backgroundColor: GameColors.muted,
          color: GameColors.text,
          padding: 8,
          borderRadius: 8
        }}
      >
        Start Game
      </button>
    </Hero>
  );
};

export default WelcomePage;

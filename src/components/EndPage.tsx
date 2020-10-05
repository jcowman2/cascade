import React from "react";
import Hero from "./Hero";

export interface EndPageProps {}

const EndPage: React.FC<EndPageProps> = props => {
  return (
    <Hero>
      <h1 style={{ fontSize: "4em", marginBottom: 0 }}>Thank you!</h1>
      <p>If you'd like to see more levels, please leave feedback!</p>
    </Hero>
  );
};

export default EndPage;

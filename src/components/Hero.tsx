import React from "react";

export interface HeroProps {}

const Hero: React.FC<HeroProps> = props => {
  return (
    <div
      style={{
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column"
      }}
    >
      {props.children}
    </div>
  );
};

export default Hero;

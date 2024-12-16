// src/components/MiniGame/MiniGame.js
import React from "react";
import GameScene from "./GameScene";

const MiniGame = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", color: "#fff", marginTop: "1rem" }}>
        Mini Game
      </h1>
      <div style={{ margin: "0 auto", width: "800px", height: "600px" }}>
        <GameScene />
      </div>
    </div>
  );
};

export default MiniGame;

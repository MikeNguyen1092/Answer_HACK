import React from "react";
import QuestionsForm from "../components/Game";
import backgroundImage from "../assets/images/tapper.gif";
import countdown from "../components/Timer"

const GamePage = () => {
  const mainStyle = {
    margin: 0,
    padding: 0,

    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    textAlign: "center",
  };

  const overlayStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "10px",
    padding: "1rem",
    maxWidth: "600px",
  };

  return (
    <main style={mainStyle}>
      <h1>Beer related trivia while enjoying a couple. {countdown}</h1>
      <div>
        <div style={overlayStyle} className="flex-row justify-center text-bold">
          <QuestionsForm />
        </div>
      </div>
    </main>
  );
};

export default GamePage;

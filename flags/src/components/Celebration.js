import React from "react";

function Celebration({ display, resetGame, hideCelebration }) {
  return !display ? (
    <></>
  ) : (
    <div className="celebration">
      <div className="celebration__background" onClick={hideCelebration}></div>

      <div className="celebration__dialogue dialogue">
        <div className="dialogue__texts">
          <h1 className="dialogue__text dialogue__text--title">
            Congradulations!
          </h1>
          <h2 className="dialogue__text dialogue__text--subtitle">
            You guessed all flags correctly!
          </h2>
          <p className="dialogue__text">
            Click 'Continue' to go back to the previous game,
          </p>
          <p className="dialogue__text">or </p>
          <p className="dialogue__text">start a new game</p>
        </div>

        <div className="dialogue__btns">
          <button className="dialogue__btn" onClick={hideCelebration}>
            Continue
          </button>
          <button className="dialogue__btn" onClick={resetGame}>
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default Celebration;

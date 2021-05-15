import React from "react";

export default function Instructions({ display, toggle }) {
  return !display ? (
    <></>
  ) : (
    <div className="instructions">
      <div className="instructions__background" onClick={toggle}></div>
      <div className="instructions__main">
        <p className="instructions__text">
          You have 100 points at each stage and will lose 10 points for each
          wrong answer. You'll go to the next level when you guess correctly.
        </p>
        <p className="instructions__text">
          If you are sure of your guess, yet it's not correct, it might be
          because the official name is different, or that the answer is another
          country which shares the same flag.
        </p>
        <p className="instructions__text">Negative scores are also possible.</p>
        <p className="instructions__text">
          The games you previously played are remembered until you reset the
          game or clear your browser's cache.
        </p>
      </div>
    </div>
  );
}

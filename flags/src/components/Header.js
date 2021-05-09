import React from "react";

export default function Header() {
  return (
    <div className="header">
      <h1 className="header__title">
        <span className="header__title header__title--fun">Fun </span>
        <span className="header__title header__title--with">With </span>
        <span className="header__title header__title--flags">Flags </span>
      </h1>
      <h3 className="header__subtitle">
        Guess which country the flag represents!
      </h3>

      <div className="header__instructions">
        <p className="header__instruction">
          You have 100 points at each stage and will lose 10 points for each
          wrong answer. You'll go to the next level when you guess correctly.
        </p>
        <p className="header__instruction">
          If you are sure of your guess, yet it's not correct, it might be
          because the official name is different, or that the answer is another
          country which shares the same flag.
        </p>
        <p className="header__instruction">
          Negative scores are also possible.
        </p>
      </div>
    </div>
  );
}

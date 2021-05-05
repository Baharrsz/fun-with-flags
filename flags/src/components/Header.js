import React from "react";

export default function Header() {
  return (
    <div className="header">
      <h1 className="header__title">
        <span className="header__title__emphasis">Fun</span> With Flags
      </h1>
      <h3 className="header__subtitle">
        Guess which country the flag represents
      </h3>
      <p className="header__instructions">
        You have 100 points at each stage and will lose 10 points for every
        wrong guess. You'll go to the next level when you guess right.
      </p>
      <p className="header__instructions">
        If you are sure of your guess, yet it's not correct, it might be because
        the official name is different, or that the answer is another country
        which shares the same flag.
      </p>
      <p className="header__instructions">Negative scores are also possible.</p>
    </div>
  );
}

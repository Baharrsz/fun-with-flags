import React from "react";

export default function Header({ toggleInstructions }) {
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
      <button className="header__btn" onClick={toggleInstructions} />
    </div>
  );
}

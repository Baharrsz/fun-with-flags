import React from "react";

export default function Display(props) {
  const { announce, src, announceClass, removeClass, current, total } = props;

  return (
    <div className="display">
      <Announce
        announce={announce}
        announceClass={announceClass}
        removeClass={removeClass}
      />
      <img className="display__item flag" src={src} alt="flag"></img>

      <Score score={current} type="current" />
      <Score score={total} type="total" />
    </div>
  );
}

function Announce({ announce, announceClass, removeClass }) {
  return (
    <div
      className={`display__item announce ${announceClass}`}
      onTransitionEnd={removeClass}
    >
      {announce}
    </div>
  );
}

function Score({ score, type }) {
  return (
    <div className={`display__item score score--${type}`}>
      <label className="score__label">{type.toUpperCase()} SCORE: </label>
      <span className="score__content">{score}</span>
    </div>
  );
}

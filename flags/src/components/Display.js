import React from "react";

export default function Display(props) {
  const {
    announce,
    src,
    announceClass,
    removeAnnounceClass,
    current,
    currentScoreClass,
    total,
    totalScoreClass,
    handleScoreAnimationStop,
  } = props;

  return (
    <div className="display">
      <Announce
        announce={announce}
        extraClass={announceClass}
        removeClass={removeAnnounceClass}
      />
      <img className="display__item flag" src={src} alt="flag"></img>

      <Score
        score={current}
        type="current"
        extraClass={currentScoreClass}
        handleAnimationStop={handleScoreAnimationStop}
      />
      <Score
        score={total}
        type="total"
        extraClass={totalScoreClass}
        handleAnimationStop={handleScoreAnimationStop}
      />
    </div>
  );
}

function Announce({ announce, extraClass, removeClass }) {
  return (
    <div
      className={`display__item announce ${extraClass}`}
      onAnimationEnd={removeClass}
    >
      {announce}
    </div>
  );
}

function Score({ score, type, extraClass, handleAnimationStop }) {
  return (
    <div className={`display__item score score--${type}`}>
      <label className="score__label">
        {type.toUpperCase()} SCORE:&nbsp;&nbsp;
      </label>
      <span
        className={`score__content ${extraClass}`}
        onAnimationEnd={handleAnimationStop}
      >
        {score}
      </span>
    </div>
  );
}

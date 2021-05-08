import React from "react";

export default function Display(props) {
  const {
    announce,
    announceClass,
    removeAnnounceClass,
    src,
    flagClass,
    current,
    currentScoreClass,
    total,
    totalScoreClass,
    handleScoreAnimationStop,
    count,
    countClass,
    allGamesNum,
  } = props;

  return (
    <div className="display">
      <Announce
        announce={announce}
        extraClass={announceClass}
        removeClass={removeAnnounceClass}
      />
      <img
        className={`display__item flag ${flagClass}`}
        src={src}
        alt="flag"
      ></img>

      <Score
        score={current}
        type="current-score"
        extraClass={currentScoreClass}
        handleAnimationStop={handleScoreAnimationStop}
      />
      <Score
        score={total}
        type="total-score"
        extraClass={totalScoreClass}
        handleAnimationStop={handleScoreAnimationStop}
      />
      <Score
        score={count}
        type="correct-guesses"
        extraClass={countClass}
        handleAnimationStop={handleScoreAnimationStop}
        allGamesNum={allGamesNum}
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

function Score(props) {
  let { score, type, extraClass, handleAnimationStop, allGamesNum } = props;
  allGamesNum = allGamesNum ? (
    <label className="score__label">&nbsp; of &nbsp;{allGamesNum}</label>
  ) : (
    <></>
  );

  return (
    <div className={`display__item score score--${type}`}>
      <label className="score__label">
        {type.replace("-", " ").toUpperCase()} &nbsp;&nbsp;
      </label>
      <span
        className={`score__content score__${extraClass}`}
        onAnimationEnd={handleAnimationStop}
      >
        {score}
      </span>
      {allGamesNum}
    </div>
  );
}

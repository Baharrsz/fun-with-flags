import React from "react";

export default function Score(props) {
  return (
    <div className="score">
      <div className="score__current">
        <label className="score__current-label">Current Score : </label>
        <span className="score__current-content">{props.current}</span>
      </div>
      <div className="score__total">
        <label className="score__total-label">Total Score : </label>
        <span className="score__total-content">{props.total}</span>
      </div>
    </div>
  );
}

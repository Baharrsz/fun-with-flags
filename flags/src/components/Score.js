import React from "react";

export default function Score(props) {
  return (
    <div className="Score">
      <div className="Score__current">
        <label className="Score__current-label">Current Score : </label>
        <span className="Score__current-content">{props.current}</span>
      </div>
      <div className="Score__total">
        <label className="Score__total-label">Total Score : </label>
        <span className="Score__total-content">{props.total}</span>
      </div>
    </div>
  );
}

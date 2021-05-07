import React, { Component } from "react";

export default class Score extends Component {
  render() {
    return (
      <div className="score">
        <div className="score__current">
          <label className="score__current-label">Current Score : </label>
          <span className="score__current-content">{this.props.current}</span>
        </div>
        <div className="score__total">
          <label className="score__total-label">Total Score : </label>
          <span className="score__total-content">{this.props.total}</span>
        </div>
      </div>
    );
  }
}

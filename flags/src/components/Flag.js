import React, { Component } from "react";

export default class Flag extends Component {
  render() {
    const { announce, src, announceClass } = this.props;

    return (
      <div className="flag">
        <div className={`flag__announce ${announceClass}`}>{announce}</div>
        <img className="flag__img" src={src} alt="flag"></img>
      </div>
    );
  }
}

import React, { Component } from "react";

export default class Flag extends Component {
  render() {
    const { announce, src, announceClass, removeClass } = this.props;

    return (
      <div className="flag">
        <div
          className={`flag__announce ${announceClass}`}
          onTransitionEnd={removeClass}
        >
          {announce}
        </div>
        <img className="flag__img" src={src} alt="flag"></img>
      </div>
    );
  }
}

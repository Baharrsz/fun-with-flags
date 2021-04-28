import React, { Component } from "react";

export default class UserInput extends Component {
  state = { features: false, options: false };

  render() {
    return (
      <form className="input" onSubmit={this.props.handleSubmit}>
        <MainGuessSection />
        <FeaturesInstructionSection handleClick={this.displaySection} />
        <FeaturesGuessSection display={this.state.features} />
        <OptionsInstructionSection handleClick={this.displaySection} />
        <OptionsGuessSection display={this.state.options} />

        <button className="input__submit" type="button">
          Submit
        </button>

        <button
          className="input__givup"
          type="button"
          onClick={this.props.handleGiveup}
        >
          Give Up!
        </button>
      </form>
    );
  }

  displaySection = (event) => {
    const stateKey = event.target.name.split("-")[0];
    let stateObj = {};
    stateObj[stateKey] = !this.state[stateKey];
    this.setState(stateObj);
  };
}

function MainGuessSection() {
  return (
    <div className="input__section">
      <label className="input__title input__text">Guess the country</label>
      <input className="input__content" name="country"></input>
    </div>
  );
}

function FeaturesInstructionSection({ handleClick }) {
  return (
    <div className="input__section">
      <p className="input__text">OR</p>
      <button
        className="input__btn"
        type="button"
        onClick={handleClick}
        name="features-btn"
      >
        Use hints
      </button>
      <p className="input__text">
        Guess the continent, language or currency first.
      </p>
      <p className="input__text">(You will lose 5 points)</p>
    </div>
  );
}

function FeaturesGuessSection({ display }) {
  return !display ? (
    <></>
  ) : (
    <div className="input__section" name="features">
      <label className="input__title input__text"></label>
      <select className="input__select" name="select">
        <option className="input__select-option" value="dummy">
          Select a feature
        </option>
        <option className="input__select-option" value="continent">
          Continent
        </option>
        <option className="input__select-option" value="languages">
          Language
        </option>
        <option className="input__select-option" value="currencies">
          Currency
        </option>
      </select>
      <input className="input__content" name="other"></input>
    </div>
  );
}

function OptionsInstructionSection({ handleClick }) {
  return (
    <div className="input__section">
      <p className="input__text">OR</p>
      <button
        className="input__btn"
        onClick={handleClick}
        name="options-btn"
        type="button"
      >
        Select from 5 options
      </button>
    </div>
  );
}
function OptionsGuessSection({ display }) {
  return !display ? (
    <></>
  ) : (
    <div className="input__section" name="options"></div>
  );
}

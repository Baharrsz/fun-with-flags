import React, { Component } from "react";

export default class UserInput extends Component {
  state = { features: false, options: false };

  render() {
    return (
      <div className="input">
        <GuessSection
          type="country"
          sectionType="subsection"
          handleSubmit={this.props.handleSubmit}
        />
        <FeaturesInstructionSection handleClick={this.displaySection} />
        <FeaturesGuessSection
          display={this.state.features}
          handleSubmit={this.props.handleSubmit}
        />
        <OptionsInstructionSection handleClick={this.displaySection} />
        <OptionsGuessSection display={this.state.options} />

        <button
          className="input__givup"
          type="button"
          onClick={this.props.handleGiveup}
        >
          Give Up!
        </button>
      </div>
    );
  }

  displaySection = (event) => {
    const stateKey = event.target.name.split("-")[0];
    let stateObj = {};
    stateObj[stateKey] = !this.state[stateKey];
    this.setState(stateObj);
  };
}

function GuessSection({ type, sectionType, handleSubmit }) {
  return (
    <form
      className={`input__form input__form--${type} input__${sectionType}`}
      id={`${type}`}
      onSubmit={handleSubmit}
    >
      <label className="input__title input__text">
        Guess the {type} <input className="input__content" name={type} />
      </label>

      <button className="input__submitBtn"> {">"} </button>
    </form>
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

function FeaturesGuessSection({ display, handleSubmit }) {
  return !display ? (
    <></>
  ) : (
    <div className="input__section" name="features">
      <RadioOptions
        type="continent"
        optionNames={["Asia", "Africa", "Americas", "Europe", "Oceania"]}
        handleSubmit={handleSubmit}
      />
      <GuessSection
        type="language"
        sectionType="subsection"
        handleSubmit={handleSubmit}
      />
      <GuessSection
        type="currency"
        sectionType="subsection"
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

function RadioOptions({ type, optionNames, handleSubmit }) {
  const options = optionNames.map((option, idx) => (
    <label className="input__title input__text" key={idx}>
      <input
        type="radio"
        name="continent"
        className="input__radio"
        value={option}
      />
      {option}
    </label>
  ));

  return (
    <form
      className="input__form input__form--continent input__subsection"
      id="continent"
      onSubmit={handleSubmit}
    >
      <label className="input__title input__text">Choose the {type}</label>
      {options}
      <button className="input__submitBtn"> {">"} </button>
    </form>
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
function OptionsGuessSection({ display, handleSubmit }) {
  return !display ? (
    <></>
  ) : (
    <form className="input__section" name="options" onSubmit={handleSubmit}>
      <button className="input__submitBtn"> {">"} </button>
    </form>
  );
}

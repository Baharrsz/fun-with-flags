import React from "react";
import FeaturesSection from "./FeaturesSection";
import OptionsSection from "./OptionsSection";

export default function UserInput(props) {
  const {
    handleSubmit,
    country,
    countriesArray,
    handleGiveup,
    handleReset,
    changeScore,
    seeOptionsScore,
  } = props;

  return (
    <div className="input">
      <GuessSection
        type="country"
        sectionType="section"
        handleSubmit={handleSubmit}
      />

      <FeaturesSection handleSubmit={handleSubmit} />

      <OptionsSection
        handleSubmit={handleSubmit}
        country={country}
        countriesArray={countriesArray}
        changeScore={changeScore}
        seeOptionsScore={seeOptionsScore}
      />

      <button
        className="input__btn input__btn--giveup"
        type="button"
        onClick={handleGiveup}
      >
        Give Up!
      </button>

      <button
        className="input__btn input__btn--rest"
        type="button"
        onClick={handleReset}
      >
        Reset Game
      </button>
    </div>
  );
}

function GuessSection({ type, sectionType, handleSubmit }) {
  return (
    <form
      className={`input__form input__form--${type} input__${sectionType}`}
      id={`${type}`}
      onSubmit={handleSubmit}
    >
      <label className="input__title input__text">
        Guess the {type}: <input className="input__box" name={type} />
      </label>

      <button className="input__submitBtn">►</button>
    </form>
  );
}

function Radio({ type, optionNames, handleSubmit }) {
  const options = optionNames.map((option, idx) => (
    <label className="input__text input__option" key={idx}>
      <input
        type="radio"
        name={`${type}-options`}
        className="input__radio"
        value={option}
      />
      {option}
    </label>
  ));

  return (
    <form
      className={`input__form input__form--options input__form--${type}-options input__subsection`}
      id={`${type}-options`}
      onSubmit={handleSubmit}
    >
      <label className="input__title input__text">Choose the {type}: </label>
      <div className="input__all-options">{options}</div>

      <button className="input__submitBtn">►</button>
    </form>
  );
}

export { Radio, GuessSection };

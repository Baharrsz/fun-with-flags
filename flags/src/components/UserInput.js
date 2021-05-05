import React from "react";
import TextInput from "react-autocomplete-input";
import "react-autocomplete-input/dist/bundle.css";

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
        countriesArray={countriesArray}
      />

      <FeaturesSection handleSubmit={handleSubmit} />

      <OptionsSection
        handleSubmit={handleSubmit}
        country={country}
        countriesArray={countriesArray}
        changeScore={changeScore}
        seeOptionsScore={seeOptionsScore}
      />
      <div className="input__btns input__section input__section--btns">
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
    </div>
  );
}

function GuessSection({ type, sectionType, handleSubmit, countriesArray }) {
  return (
    <form
      className={`input__form input__${sectionType} input__${sectionType}--${type}`}
      id={`${type}`}
      onSubmit={handleSubmit}
    >
      <label className="input__title input__text">
        Guess the {type}:{/* <input name={type} /> */}
        <TextInput
          name={type}
          options={countriesArray}
          Component="input"
          trigger=""
          matchAny={true}
          spacer=""
        />
      </label>

      <button className="input__submitBtn">►</button>
    </form>
  );
}

function Radio({ type, optionNames, handleSubmit, hideOptions }) {
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
      className={`input__form input__subsection input__subsection--options`}
      id={`${type}-options`}
      onSubmit={(submit) => {
        submit.preventDefault();
        handleSubmit(submit);
        //For the case when component gets called from Options section.
        //The time lapse is there so that the form isn't deleted before submission.
        setTimeout(hideOptions, 50);
      }}
    >
      <label className="input__title input__text">Choose the {type}: </label>
      <div className="input__options-group">{options}</div>

      <button className="input__submitBtn">►</button>
    </form>
  );
}

export { Radio, GuessSection };

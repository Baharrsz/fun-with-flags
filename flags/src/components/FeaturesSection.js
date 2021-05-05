import React from "react";
import { Radio, GuessSection } from "./UserInput";

function FeaturesInstructions() {
  return (
    <div className="input__subsection input__subsection--instructions">
      <p className="input__text input__text--or">OR</p>
      <p className="input__text">
        Guess the continent, language or currency first.
      </p>
      <p className="input__text">(You will lose 5 points for each guess)</p>
    </div>
  );
}

function FeaturesSection({ handleSubmit, inputVal, handleInputChange }) {
  return (
    <div className="input__section input__section--features" name="features">
      <FeaturesInstructions />
      <Radio
        type="continent"
        optionNames={["Asia", "Africa", "Americas", "Europe", "Oceania"]}
        handleSubmit={handleSubmit}
      />
      <GuessSection
        type="language"
        sectionType="subsection"
        handleSubmit={handleSubmit}
        inputVal={inputVal.language}
        handleInputChange={handleInputChange}
      />
      <GuessSection
        type="currency"
        sectionType="subsection"
        handleSubmit={handleSubmit}
        inputVal={inputVal.currency}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}

export default FeaturesSection;

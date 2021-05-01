import React, { Component } from "react";
import { Radio } from "./UserInput";

export default class OptionsSection extends Component {
  state = { displayOptns: false };

  render() {
    return (
      <div className="input__section input__section--options">
        <OptionsInstruction handleClick={this.displaySection} />
        <OptionsGuess
          display={this.state.displayOptns}
          handleSubmit={this.props.handleSubmit}
          country={this.props.country}
          countriesArray={this.props.countriesArray}
        />
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.country !== this.props.country)
      this.setState({ displayOptns: false });
  }

  displaySection = () => {
    this.setState({ displayOptns: !this.state.displayOptns });
  };
}

function OptionsInstruction({ handleClick }) {
  return (
    <div className="input__subsection input__subsection--instructions">
      <p className="input__text input__text--or">OR</p>
      <button
        className="input__btn input__btn--expand"
        onClick={handleClick}
        name="options-btn"
        type="button"
      >
        Select from 5 options
        <p className="input__text">(You will lose 20 points)</p>
      </button>
    </div>
  );
}

function OptionsGuess(props) {
  const { display, handleSubmit, country, countriesArray } = props;
  const optionNames = produceOptions(country, countriesArray);

  return !display ? (
    <></>
  ) : (
    <div className="input__subsection">
      <Radio
        type="country"
        optionNames={optionNames}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

function produceOptions(country, countriesArray) {
  let options = [country.name];
  for (let i = 1; i <= 4; i++) {
    const random = Math.floor(Math.random() * countriesArray.length);
    if (!options.includes(countriesArray[random].name))
      options.unshift(countriesArray[random].name);
  }
  const random = Math.floor(Math.random() * 3);
  [options[4], options[random]] = [options[random], options[4]];
  return options;
}

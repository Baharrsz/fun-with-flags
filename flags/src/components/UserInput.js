import React from "react";

export default function UserInput(props) {
  return (
    <form className="input" onSubmit={props.handleSubmit}>
      <div className="input__section">
        <label className="input__title input__text">Guess the country</label>
        <input className="input__content" name="country"></input>
      </div>

      <p className="input__text">OR</p>
      <div className="input__section">
        <label className="input__title input__text">
          <p className="input__text">Use hints</p>
          <p className="input__text">
            Guess the continent, language or currency
          </p>
          <p className="input__text">(You will lose 5 points)</p>
        </label>
        <select className="input__select" name="select">
          <option className="input__select-option" value="dummy">
            Select a feature
          </option>
          <option className="input__select-option" value="Continent">
            Continent
          </option>
          <option className="input__select-option" value="Language">
            Language
          </option>
          <option className="input__select-option" value="Currency">
            Currency
          </option>
        </select>
        <input className="input__content" name="other"></input>
      </div>

      <button className="input__submit">Submit</button>

      <button
        className="input__givup"
        type="button"
        onClick={props.handleGiveup}
      >
        Give Up!
      </button>
    </form>
  );
}

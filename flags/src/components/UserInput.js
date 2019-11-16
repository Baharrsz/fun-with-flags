import React from "react";

export default function UserInput(props) {
  return (
    <form className="input" onSubmit={props.handleSubmit}>
      <label className="input__title">Country's name</label>
      <input className="input__content" name="country"></input>
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

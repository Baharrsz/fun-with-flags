import React from "react";
import axios from "axios";
import Flag from "./components/Flag.js";
import UserInput from "./components/UserInput";
import Score from "./components/Score";

class App extends React.Component {
  state = {
    countriesArray: undefined,
    country: undefined,
    currentScore: 100,
    totalScore: 0,
    sign: 0
  };
  render() {
    if (!this.state.country)
      return (
        <>
          <h1 className="header">
            <span className="header__fun">Fun</span> <span>with</span>{" "}
            <span>Flags</span>
          </h1>
          <div>Loading...</div>
        </>
      );
    else {
      return (
        <>
          <h1 className="header">
            <span className="header__fun">Fun</span> <span>with</span>{" "}
            <span>Flags</span>
          </h1>
          <Flag src={this.state.country.flag} sign={this.state.sign} />
          <UserInput
            handleSubmit={this.handleInput}
            handleGiveup={this.handleGiveup}
            handleOther={this.handleOhter}
          />
          <Score
            current={this.state.currentScore}
            total={this.state.totalScore}
          />
        </>
      );
    }
  }

  getCountry = () => {
    let index = Math.floor(Math.random() * this.state.countriesArray.length);
    let country = this.state.countriesArray[index];
    axios
      .get(`https://restcountries.eu/rest/v2/name/${country.name}`)
      .then(response => {
        country = response.data[0];
        console.log(country);
        this.setState({
          country: country
        });
      });
  };

  componentDidMount() {
    axios
      .get("https://restcountries.eu/rest/v2/all?fields=name")
      .then(response => {
        let countriesArray = response.data;
        this.setState({ countriesArray: countriesArray });
        this.getCountry();
      });
  }

  handleInput = submit => {
    submit.preventDefault();
    let guessed = submit.target.country.value;
    let select = submit.target.select.value;

    if (select === "dummy") {
      if (guessed.toLowerCase() === this.state.country.name.toLowerCase()) {
        this.setState({
          totalScore: this.state.totalScore + this.state.currentScore,
          currentScore: 100,
          sign: 1
        });
        this.getCountry();
      } else {
        this.setState({
          currentScore: this.state.currentScore - 10,
          sign: 2
        });
      }
    } else if (select === "continent") {
      if (this.state.country[select] === submit.target.other.value)
        this.setState({
          sign: 1,
          currentScore: this.state.currentScore - 5
        });
      else {
        this.setState({
          sign: 2,
          currentScore: this.state.currentScore - 5
        });
      }
    } else {
      this.state.country[select].forEach(value => {
        if (
          value.name.toLowerCase() ===
            submit.target.other.value.toLowerCase() ||
          value.nativeName.toLowerCase() ===
            submit.target.other.value.toLowerCase()
        ) {
          this.setState({
            sign: 1,
            currentScore: this.state.currentScore - 5
          });
        } else {
          this.setState({
            sign: 2,
            currentScore: this.state.currentScore - 5
          });
        }
      });
    }

    submit.target.reset();
  };

  handleGiveup = () => {
    this.setState({ totalScore: this.state.totalScore - 10 });
    this.getCountry();
    this.setState({ sign: 0 });
  };
}

export default App;

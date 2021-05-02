import React, { Component } from "react";
import axios from "axios";
import Flag from "./components/Flag.js";
import UserInput from "./components/UserInput";
import Score from "./components/Score";
import Header from "./components/Header";

class App extends Component {
  constructor(props) {
    super(props);
    this.wrongGuessScore = -10;
    this.useHintScore = -5;
    this.seeOptionsScore = -20;
  }

  state = {
    countriesArray: undefined,
    country: undefined,
    currentScore: 100,
    totalScore: 0,
    announce: null,
  };
  render() {
    if (!this.state.country) return <div>Loading...</div>;
    else {
      return (
        <>
          <Header />
          <Flag src={this.state.country.flag} announce={this.state.announce} />
          <Score
            current={this.state.currentScore}
            total={this.state.totalScore}
          />
          <UserInput
            handleSubmit={this.handleSubmit}
            handleGiveup={this.handleGiveup}
            handleReset={this.handleReset}
            country={this.state.country}
            countriesArray={this.state.countriesArray}
          />
        </>
      );
    }
  }

  componentDidMount() {
    axios
      .get("https://restcountries.eu/rest/v2/all?fields=name")
      .then((response) => {
        let countriesArray = response.data;
        this.setState({ countriesArray: countriesArray });
        this.getCountry();
      });
  }

  getCountry = () => {
    let index = Math.floor(Math.random() * this.state.countriesArray.length);
    let country = this.state.countriesArray[index];
    axios
      .get(`https://restcountries.eu/rest/v2/name/${country.name}`)
      .then((response) => {
        country = response.data[0];
        console.log(country);
        this.setState({
          country: country,
          announce: null,
        });
      });
  };

  handleSubmit = (submit) => {
    submit.preventDefault();
    let type = submit.target.id;

    const submitted = submit.target[type].value.toLowerCase();

    switch (type) {
      case "country":
        this.handleFinalGuess(submitted, false);
        break;
      case "continent-options":
        this.handleFeatureGuess("continent", submitted);
        break;

      case "language":
        this.handleFeatureGuess("languages", submitted);
        break;

      case "currency":
        this.handleFeatureGuess("currencies", submitted);
        break;

      case "country-options":
        this.handleFinalGuess(submitted, true);
        break;

      default:
        console.log("Something wrong with submission");
    }

    submit.target.reset();
  };

  handleFinalGuess = (submitted, isMultipleAnswer) => {
    const increment = isMultipleAnswer
      ? this.seeOptionsScore
      : this.wrongGuessScore;

    if (submitted === this.state.country.name.toLowerCase()) {
      this.setState(
        {
          totalScore: this.state.totalScore + this.state.currentScore,
          currentScore: 100,
          announce: "Yes!",
        },
        () => {
          setTimeout(this.getCountry, 500);
        }
      );
    } else
      this.setState({
        currentScore: this.state.currentScore + increment,
        announce: "Nope!",
      });
  };

  handleFeatureGuess = (type, submitted) => {
    this.changeCurrentScore(this.useHintScore);
    const isCorrect =
      type === "continent"
        ? submitted === this.state.country.region.toLowerCase()
        : this.state.country[type].some(
            (value) => value.name.toLowerCase() === submitted
          );

    if (isCorrect) {
      this.setState({
        announce: "Yes",
      });
    } else
      this.setState({
        announce: "No",
      });
  };

  handleGiveup = () => {
    this.setState({
      totalScore: this.state.totalScore + this.useHintScore,
      currentScore: 100,
    });
    this.getCountry();
  };

  handleReset = () => {
    this.setState({ currentScore: 100, totalScore: 0 });
    this.getCountry();
  };

  changeCurrentScore = (increment) => {
    this.setState((state) => ({
      currentScore: state.currentScore + increment,
    }));
  };
}

export default App;

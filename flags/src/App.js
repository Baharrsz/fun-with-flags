import React, { Component } from "react";
import axios from "axios";
import Display from "./components/Display";
import UserInput from "./components/UserInput";
import Header from "./components/Header";
import Celebration from "./components/Celebration";
import Loading from "./components/Loading";
import Instructions from "./components/Instructions";

class App extends Component {
  constructor(props) {
    super(props);
    this.wrongGuessScore = -10;
    this.useHintScore = -5;
    this.seeOptionsScore = -20;
    this.scoreAnimationClassName = ["animation--increment", "animation--move"];
    this.flagAnimationClassName = [
      "flag__animation--appear",
      "flag__animation--disappear",
    ];
    this.optionsAnimationClassName = "input__show-options";
    this.newGameDelay = 2000;
  }

  state = {
    countriesArray: undefined,
    country: undefined,
    guessed: [],
    currentScore: 100,
    currentScoreClass: "",
    totalScore: 0,
    totalScoreClass: "",
    announce: null,
    announceClass: "",
    countryInputVal: "",
    languageInputVal: "",
    currencyInputVal: "",
    countClass: "",
    displayCelebration: false,
    flagClass: "",
    optionsClass: "",
    displayInstructions: false,
  };
  render() {
    let inputValObj = {
      country: this.state.countryInputVal,
      language: this.state.languageInputVal,
      currency: this.state.currencyInputVal,
    };
    if (!this.state.country) return <Loading />;
    else {
      return (
        <>
          <Header toggleInstructions={this.toggleInstructions} />
          <Instructions
            display={this.state.displayInstructions}
            toggle={this.toggleInstructions}
          />
          <div className="content">
            <Display
              announce={this.state.announce}
              announceClass={this.state.announceClass}
              removeAnnounceClass={this.removeAnnounceClass}
              src={this.state.country.flag}
              flagClass={this.state.flagClass}
              current={this.state.currentScore}
              currentScoreClass={this.state.currentScoreClass}
              handleScoreAnimationStop={this.handleScoreAnimationStop}
              total={this.state.totalScore}
              totalScoreClass={this.state.totalScoreClass}
              count={this.state.guessed.length}
              countClass={this.state.countClass}
              allGamesNum={this.state.countriesArray.length}
            />

            <UserInput
              handleSubmit={this.handleSubmit}
              handleGiveup={this.handleGiveup}
              handleReset={this.handleReset}
              changeScore={this.changeCurrentScore}
              seeOptionsScore={this.seeOptionsScore}
              country={this.state.country}
              countriesArray={this.state.countriesArray}
              inputVal={inputValObj}
              handleInputChange={this.handleInputChange}
            />
          </div>
          <Celebration
            display={this.state.displayCelebration}
            resetGame={this.handleReset}
            hideCelebration={this.hideCelebration}
          />
        </>
      );
    }
  }

  componentDidMount() {
    axios
      .get("https://restcountries.eu/rest/v2/all?fields=name")
      .then((response) => {
        //response.data format [{name: country_name}]
        let countriesArray = response.data.map((countryObj) => countryObj.name);
        this.setState({ countriesArray: countriesArray });
        this.getCountry();
      });
  }

  getCountry = () => {
    let country;
    //The condition checks that a country is not selected twice (before all countries are guessed)
    while (
      !country ||
      (this.state.guessed.length !== this.state.countriesArray &&
        this.state.guessed.indexOf(country) >= 0)
    ) {
      let index = Math.floor(Math.random() * this.state.countriesArray.length);
      country = this.state.countriesArray[index];
    }
    axios
      .get(`https://restcountries.eu/rest/v2/name/${country}`)
      .then((response) => {
        country = response.data[0];
        console.log(country);
        setTimeout(
          () =>
            this.setState({
              country: country,
              announce: null,
              currentScore: 100,
              flagClass: this.flagAnimationClassName[0],
            }),
          this.newGameDelay
        );
      });
  };

  handleSubmit = (submit) => {
    submit.preventDefault();
    let type = submit.target.id;
    const submitted = submit.target[type].value.toLowerCase();

    //Clearing out the input field
    if (type === "country" || type === "language" || type === "currency")
      this.handleInputChange("", type);

    //Adjusting the score and announcement
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
    const increment = isMultipleAnswer ? 0 : this.wrongGuessScore;
    const animationClassName = isMultipleAnswer
      ? ""
      : this.scoreAnimationClassName[0];

    //Checking if the submitted answer equals the country's name or alternative spellings
    //(index 0 of altSpellings is excluded because it's a two letter representation of the country's name)
    if (
      submitted === this.state.country.name.toLowerCase() ||
      this.state.country.altSpellings.some(
        (spelling, idx) => idx !== 0 && submitted === spelling.toLowerCase()
      )
    ) {
      this.setState(
        {
          currentScoreClass: this.scoreAnimationClassName[1],
          announce: "Yes!",
          announceClass: announceClassName("final", "yes"),
          guessed: [...this.state.guessed, this.state.country.name],
          flagClass: this.flagAnimationClassName[1],
        },
        () => {
          //Showing celebration if all countries have been played
          if (this.state.guessed.length === this.state.countriesArray.length)
            this.setState({ displayCelebration: true });

          //Selecting a new country and starting a new game
          this.getCountry();
        }
      );
    } else
      this.setState({
        currentScore: this.state.currentScore + increment,
        currentScoreClass: animationClassName,
        announce: "Nope!",
        announceClass: announceClassName("final", "no"),
      });
  };

  handleFeatureGuess = (type, submitted) => {
    //Adjust score
    this.changeCurrentScore(this.useHintScore);
    const isCorrect =
      type === "continent"
        ? submitted === this.state.country.region.toLowerCase()
        : this.state.country[type].some(
            (value) => value.name.toLowerCase() === submitted
          );

    //Show announcement
    if (isCorrect) {
      this.setState({
        announce: "Yes",
        announceClass: announceClassName("feature", "yes"),
      });
    } else
      this.setState({
        announce: "No",
        announceClass: announceClassName("feature", "no"),
      });
  };

  handleGiveup = () => {
    this.setState({
      totalScore: this.state.totalScore + this.useHintScore,
      currentScore: 100,
      countryInputVal: "",
      languageInputVal: "",
      currencyInputVal: "",
      flagClass: this.flagAnimationClassName[1],
    });
    this.getCountry();
  };

  handleReset = () => {
    this.setState({
      guessed: [],
      currentScoreClass: "",
      totalScore: 0,
      totalScoreClass: "",
      announceClass: "",
      countryInputVal: "",
      languageInputVal: "",
      currencyInputVal: "",
      countClass: "",
      displayCelebration: false,
    });
    this.getCountry();
  };

  handleInputChange = (change, type) => {
    let key = `${type}InputVal`;
    let obj = {};
    obj[key] = change;
    this.setState(obj);
  };

  changeCurrentScore = (increment) => {
    this.setState((state) => ({
      currentScore: state.currentScore + increment,
      currentScoreClass: this.scoreAnimationClassName[0],
    }));
  };

  removeAnnounceClass = () => {
    let classList = this.state.announceClass.split(" ");
    this.setState({ announceClass: classList[1] + " " + classList[2] });
  };

  handleScoreAnimationStop = () => {
    //Game has finished and current score 'moved' and got added to total score
    if (this.state.currentScoreClass.includes("move")) {
      this.setState({
        currentScoreClass: "",
        totalScore: this.state.totalScore + this.state.currentScore,
        totalScoreClass: this.scoreAnimationClassName[0],
        countClass: this.scoreAnimationClassName[0],
      });
    }
    //In the middle of the game, current score got 'incremented'
    if (this.state.currentScoreClass.includes("increment")) {
      this.setState({ currentScoreClass: "" });
    }
    //Game has finished and total score and correct guesses got 'incremented'
    if (this.state.totalScoreClass.includes("increment")) {
      this.setState({ totalScoreClass: "", countClass: "" });
    }
    //Game has finished and correct guesses got 'incremented'
    if (this.state.countClass.includes("increment")) {
      this.setState({});
    }
  };

  removeScoreClass = () => this.setState({ currentScoreClass: "" });

  hideCelebration = () => this.setState({ displayCelebration: false });

  toggleInstructions = () =>
    this.setState({ displayInstructions: !this.state.displayInstructions });
}

function announceClassName(type, yOrN) {
  return `announce__animation--${type} announce__${type} announce__${type}--${yOrN}`;
}

export default App;

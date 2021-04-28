import React, { Component } from "react";
import axios from "axios";
import Flag from "./components/Flag.js";
import UserInput from "./components/UserInput";
import Score from "./components/Score";

class App extends Component {
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
          <Flag src={this.state.country.flag} announce={this.state.announce} />
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
      .then((response) => {
        country = response.data[0];
        console.log(country);
        this.setState({
          country: country,
          announce: null,
        });
      });
  };

  componentDidMount() {
    axios
      .get("https://restcountries.eu/rest/v2/all?fields=name")
      .then((response) => {
        let countriesArray = response.data;
        this.setState({ countriesArray: countriesArray });
        this.getCountry();
      });
  }

  handleInput = (submit) => {
    submit.preventDefault();
    let guessed = submit.target.country.value;
    let select = submit.target.select.value;

    if (select === "dummy") {
      if (guessed.toLowerCase() === this.state.country.name.toLowerCase()) {
        this.setState({
          totalScore: this.state.totalScore + this.state.currentScore,
          currentScore: 100,
          announce: "Yes!",
        });
        this.getCountry();
      } else {
        this.setState({
          currentScore: this.state.currentScore - 10,
          announce: "Nope!",
        });
      }
    } else if (select === "continent") {
      if (
        this.state.country.region.toLowerCase() ===
        submit.target.other.value.toLowerCase()
      )
        this.setState({
          announce: "Yes",
          currentScore: this.state.currentScore - 5,
        });
      else {
        this.setState({
          announce: "No",
          currentScore: this.state.currentScore - 5,
        });
      }
    } else {
      if (
        this.state.country[select].some(
          (value) =>
            value.name.toLowerCase() === submit.target.other.value.toLowerCase()
        )
      ) {
        this.setState({
          announce: "Yes",
          currentScore: this.state.currentScore - 5,
        });
      } else {
        this.setState({
          announce: "No",
          currentScore: this.state.currentScore - 5,
        });
      }
    }
    submit.target.reset();
  };

  handleGiveup = () => {
    this.setState({ totalScore: this.state.totalScore - 10 });
    this.getCountry();
    this.setState({ announce: null });
  };
}

export default App;

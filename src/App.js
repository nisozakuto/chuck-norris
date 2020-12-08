import "./App.css";
import React, { Component } from "react";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      randomResponse: "",
    };
  }

  connectToChuck = () => {
    fetch(
      "https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-rapidapi-key": process.env.REACT_APP_KEY,
          "x-rapidapi-host": "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          randomResponse: res,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.connectToChuck();
  };

  render() {
    return (
      <div>
        <h1>Chuck Norris Jokes</h1>
        <form className="jokesForm" onSubmit={this.handleSubmit}>
          <label>Get a new joke</label>
          <input type="submit" value="Go!"></input>
        </form>
        {this.state.randomResponse ? (
          <p>{this.state.randomResponse.value}</p>
        ) : (
          <p>Make a search</p>
        )}
      </div>
    );
  }
}

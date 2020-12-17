import "./App.css";
import React, { Component } from "react";
import { trackPromise } from "react-promise-tracker";
import LoadingIndicator from "./LoadingIndicator";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      randomResponse: "",
      myState: false,
    };
  }

  setmyState = () => {
    this.setState((prevState) => ({
      myState: !prevState.myState,
    }));
  };

  componentDidMount() {
    document.addEventListener("keydown", this.nextFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.nextFunction, false);
  }

  connectToChuck = () => {
    trackPromise(
      fetch(
        "https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-rapidapi-key": process.env.REACT_APP_KEY,
            "x-rapidapi-host":
              "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          this.setState({
            randomResponse: res,
          });
        })
        .catch((err) => {
          console.error(err);
        })
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.connectToChuck();
  };

  nextFunction = (event) => {
    if (event.keyCode === 78) {
      this.connectToChuck();
    }
  };

  render() {
    return (
      <div className="wrapper">
        <main>
          <h1>Chuck Norris Jokes</h1>
          <form className="jokesForm" onSubmit={this.handleSubmit}>
            <label>Get a new joke</label>
            <input type="submit" value="Go!"></input>
          </form>

          <LoadingIndicator
            setmyState={this.setmyState}
            state={this.state.myState}
          />
          {this.state.randomResponse ? (
            <p>{this.state.randomResponse.value}</p>
          ) : (
            "Your joke will appear here"
          )}
        </main>
      </div>
    );
  }
}

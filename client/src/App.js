/* import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App; */
import React, { Component } from "react";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      totalPoints: 20,
      gameOver: false,
      message: '',
      clicks: 'muutaman'
    }
  }

  componentDidMount() {
    // initialize points
    const localPoints = localStorage.getItem('points')
    if (localPoints !== null && localPoints > 0) {
      this.setState({ 
        totalPoints: localPoints * 1, // makes the value a number
        gameOver: false 
      })
    } else {
      this.setState({ totalPoints: 20 })
    }
  }

  savePointsLocally = () => {
    localStorage.setItem('points', this.state.totalPoints)
  }

  showReplayButton = () => {
    if (this.state.gameOver) {
      return (
        <button onClick={ this.handleReplayClick }>
          Aloita uusi peli
        </button>
      )
    }
  }

  handleReplayClick = () => {
    this.setState({ 
      gameOver: false,
      totalPoints: 20,
      message: '' 
    })
  }

  handleClick = async () => {
    // get response from backend
    const url = '/play'
    const response = await fetch(url, {
      method: 'PUT'
    })
    const body = await response.json()
    if (response.status !== 200) {
      throw Error(body.message)
    }
    
    // update points, clicks and messages
    const pointsAwarded = body.points
    const clicksToNext = body.clicks
    const newTotalPoints = this.state.totalPoints + pointsAwarded - 1 // add variable

    this.setState({ 
      totalPoints: newTotalPoints,
      clicks: clicksToNext,
      message : (pointsAwarded === 0) ? 'Ei voittoa.' : `Jee, voitit ${pointsAwarded} pistettä!`
     })
     
    this.savePointsLocally()

    // check if game is over, update message and gameOver status
    if (this.state.totalPoints <= 0) {
      this.setState({ 
        gameOver: true,
        message: 'Peli loppui!'
      })  
    }
  }

  render() {
    return (
    <div>
      <h1>Painikepeli</h1>
      <div> 
        Pisteet: {this.state.totalPoints}
      </div>
      <div>
        Seuraava voitto on vain {this.state.clicks} painalluksen päässä!
      </div>
      <div>
        <button 
          onClick = {this.handleClick}
          disabled = {this.state.gameOver}>
            Pelaa
        </button>
        {this.state.message}
      </div>

      <div>
          {this.showReplayButton()}
      </div>

    </div> 
    )
  }
}

export default App;

/* import React from 'react';
import logo from './logo.svg';
import './App.css'; */

import React, { Component } from "react";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      totalPoints: 0,
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
      this.setInitialPoints()
    }
  }

  // gets initial points from server
  setInitialPoints = async () => {
    const url = '/initvalue'
    const response = await fetch(url)
    const body = await response.json()
    if (response.status !== 200) {
      throw Error(body.message)
    }
    const initialPoints = body.init
    this.setState({ totalPoints: initialPoints })
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

  handleReplayClick = async () => {
    this.setInitialPoints()
    this.setState({ 
      gameOver: false,
      message: '' 
    })
  }

  handleClick = async () => {
    // get play result from backend
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
    const pointsWon = body.won
    const newTotalPoints = this.state.totalPoints + pointsAwarded

    this.setState({ 
      totalPoints: newTotalPoints,
      clicks: clicksToNext,
      message : (pointsWon === 0) ? 'Ei voittoa.' : `Jee, voitit ${pointsWon} pistettä!`
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

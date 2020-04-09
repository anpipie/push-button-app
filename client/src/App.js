import React, { Component } from "react";

import RoundContainer from './components/RoundContainer';
import MessageContainer from './components/MessageContainer';
import ClicksMessageContainer from './components/ClicksMessageContainer';
import Button from './components/Button';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      totalPoints: 0,
      pointsWon: '',
      gameOver: false,
      message: 'Työpaikkajahti alkaa!',
      clicks: 'muutaman'
    }
  }

  // ********* points initial setting and saving ***********

  componentDidMount() {
    // initialise points
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

  // ********** click event handlers *************

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
    const newPointsWon = body.won
    const newTotalPoints = this.state.totalPoints + pointsAwarded
    this.setState({ 
      totalPoints: newTotalPoints,
      clicks: clicksToNext,
      pointsWon: '+' + newPointsWon,
      message : (newPointsWon === 0) ? 'Tällä kertaa valintamme ei kohdistunut sinuun.' : 'Jee, kutsu haastatteluun! Sait lisää puhtia.'
     })
     
    this.savePointsLocally()

    // check if game is over, update message and gameOver status
    if (this.state.totalPoints <= 0) {
      this.setState({ 
        gameOver: true,
        message: 'Puhti loppu. Peli päättyi.'
      })  
    }
  }

  render() {
    return (
    <div className='main-container'>

      <div className='top-bar'></div>
      
      <RoundContainer 
        titleTop='puhti'
        titleMiddle={this.state.totalPoints}
        titleBottom={this.state.pointsWon}
      />
      <MessageContainer
        message={this.state.message}
        className='result-message-container'
      />

      <ClicksMessageContainer
        className='clicks-message-container'
        middleText={this.state.clicks}
      />

      <div className='buttons-container'>
        <Button 
          eventHandler={this.handleClick}
          disabled={this.state.gameOver}
          text='Lähetä hakemus'
        />
        { this.state.gameOver ? <Button
          eventHandler={this.handleReplayClick}
          text='Aloita uusi peli'
          className='replay-button'
        /> : null}
      </div>

    </div> 
    )
  }
}

export default App;

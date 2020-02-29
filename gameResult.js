// ***** Setup for game points *******
//
// ** valuesAndPoints: Counter values and the respective points awarded
// ** initialPlayerPoints: Points player gets when starting the game
// ** costOfPlaying: Points player looses per click
//
// Example:
// Every 5th wins 2 points and every 10th wins 7 points: valuesAndPoints = { 5: 2, 10: 7 }
// Player starts with 10 points: initialPlayerPoints = 10

const valuesAndPoints = {
  500: 250,
  100: 40,
  10: 5
}
const initialPlayerPoints = 20

// don't change costOfPlaying without adjusting also the condition for 'game over' in the client side!!
const costOfPlaying = 1

// *********** game play result functions  *************

const countClicksToWin = (counterValue) => {
  const clicksToWin = []
  for (const value in valuesAndPoints) {
    const clicks = value - (counterValue % value)
    clicksToWin.push(clicks)
  }
  return Math.min(...clicksToWin) // smallest number of clicks to next win
}

const checkPointsWon = (counterValue) => {
  const pointsWon = [0]
  for (const value in valuesAndPoints) {
    if (counterValue % (value * 1) === 0) {
      pointsWon.push(valuesAndPoints[value])
    }
  }
  return Math.max(...pointsWon) // only the highest number of points is awarded if there are multiple wins
}

// ******* return game play results ********

const getPlayResult = (counterValue) => {
  const clicksStatus = countClicksToWin(counterValue)
  const pointsWon = checkPointsWon(counterValue)
  const pointsAwarded = pointsWon - costOfPlaying
  return { clicks: clicksStatus, points: pointsAwarded, won: pointsWon }
}

// ********* return initialPlayerPoints ************

const getInitialPlayerPoints = () => {
  return initialPlayerPoints
}

module.exports = {
  getPlayResult: getPlayResult,
  getInitialPlayerPoints: getInitialPlayerPoints
}

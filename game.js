// ***** Setup for game points *******
//
// ** pointsToWin: Points awarded when win. Values must be set to the array
// from largest number to the smallest.
// ** counterValuesForWin: Counter values that give win. Values must be set
// to the array in order that corresponds the points in pointsToWin.
// ** initialPlayerPoints: Points player gets when starting the game
// ** costOfPlaying: Points player looses/click
//
// Example:
// Winnings are 1 and 50 points: pointsToWin = [50, 1]
// 50 points is won by every 10th counter value, 1 point every 2nd: counterValueForWin = [10, 2]
// Player starts with 10 points: initialPlayerPoints = 10
// Playing the game costs 2 points/click: costOfPlaying = 2

const pointsToWin = [250, 40, 5]
const counterValuesForWin = [500, 100, 10]
const initialPlayerPoints = 20
const costOfPlaying = 1

// *********** game play result functions  *************
const countClicksToWin = (counterValue) => {
  const clicksToWin = []
  for (let i = 0; i < counterValuesForWin.length; i++) {
    const clicks = counterValuesForWin[i] - (counterValue % counterValuesForWin[i])
    clicksToWin.push(clicks)
  }
  return Math.min(...clicksToWin)
}

const checkPointsWon = (counterValue) => {
  let pointsWon = 0
  for (let i = 0; i < pointsToWin.length; i++) {
    if (counterValue % counterValuesForWin[i] === 0) {
      pointsWon = pointsToWin[i]
      return pointsWon
    }
  }
  return pointsWon
}

// ******* return game play results ********
const getGameResult = (counterValue) => {
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
  getGameResult: getGameResult,
  getInitialPlayerPoints: getInitialPlayerPoints
}

const port = process.env.PORT || 8080
const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

// ******** Counter *********

// Counter name and value in database
const counterName = 'pushButtonCounter'
const initialCounterValue = 0

require('./db')

const Counter = require('./models/counter')

const createCounterStorage = async function () {
  const initialData = {
    name: counterName,
    value: initialCounterValue
  }
  await Counter.addCounter(initialData)
}

const testIfCounterExists = async function () {
  const counterData = await Counter.getValue(counterName)
  if (typeof counterData === 'undefined' || counterData.length <= 0) {
    return false
  } else {
    return true
  }
}

const getAndAddCounterValue = async function () {
  try {
    const counterData = await Counter.getAndIncrValue('pushButtonCounter', 1)
    const currentValue = await counterData.value // current value = value before incrementing
    return currentValue
  } catch (err) {
    console.log(err)
  }
}

// ******** Game play result functions **********

const countClicksToWin = function (counterValue) {
  return 10 - (counterValue % 10)
}

const checkPointsWon = function (counterValue) {
  if (counterValue % 500 === 0) {
    return 250
  } else if (counterValue % 100 === 0) {
    return 40
  } else if (counterValue % 10 === 0) {
    return 5
  } else {
    return 0
  }
}

// *************** Routes ******************
// Future improvement idea: limit the number of requests/time unit

app.put('/play', async (req, res) => {
  try {
    let counterValue = await getAndAddCounterValue()
    counterValue++
    const clicks = countClicksToWin(counterValue)
    const points = checkPointsWon(counterValue)
    res.json({ 'clicks': clicks, 'points': points })
  } catch (err) {
    console.log(err)
  }
})

// create counter in db if it does not exist
testIfCounterExists().then((counterExists) => {
  if (!counterExists) {
    createCounterStorage()
  }
})

app.use(express.static('client/build'))

const path = require('path')
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

const server = app.listen(port, () => console.log(`Listening on port ${port}`))

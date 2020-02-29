const port = process.env.PORT || 8080
const express = require('express')
const app = express()

// set rate limit

const rateLimit = require('express-rate-limit')
const playLimiter = rateLimit({
  windowMs: 60 * 1000, // 60s
  max: 240
})
app.use('/play', playLimiter) // limits the number of requests to '/play'

// cors

const cors = require('cors')
app.use(cors())

// *************** Counter ****************

const { testIfCounterExists } = require('./gameCounter')
const { createCounterStorage } = require('./gameCounter')
const { getAndIncrCounterValue } = require('./gameCounter')

// ****** Game play result functions *******

const { getPlayResult } = require('./gameResult')
const { getInitialPlayerPoints } = require('./gameResult')

// *************** Routes *****************

app.put('/play', async (req, res) => {
  try {
    let counterValue = await getAndIncrCounterValue()
    counterValue++
    const result = getPlayResult(counterValue)
    res.json(result)
  } catch (err) {
    console.log(err)
  }
})

app.get('/initvalue', async (req, res) => {
  try {
    const initialPlayerPoints = getInitialPlayerPoints()
    res.json({ init: initialPlayerPoints })
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

const counterName = 'pushButtonCounter'
const initialCounterValue = 0

require('./db')

const Counter = require('./models/counter')

const createCounterStorage = async function () {
  const newCounter = {
    name: counterName,
    value: initialCounterValue
  }
  await Counter.addCounter(newCounter)
}

const testIfCounterExists = async function () {
  const counterData = await Counter.getValue(counterName)
  if (typeof counterData === 'undefined' || counterData.length <= 0) {
    return false
  } else {
    return true
  }
}

const getAndIncrCounterValue = async function () {
  try {
    const counterData = await Counter.getAndIncrValue('pushButtonCounter', 1)
    const currentValue = await counterData.value // current value = value before incrementing
    return currentValue
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  createCounterStorage: createCounterStorage,
  testIfCounterExists: testIfCounterExists,
  getAndIncrCounterValue: getAndIncrCounterValue
}

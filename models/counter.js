const mongoose = require('mongoose')

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true } // maybe add timestamp...?
})

counterSchema.statics.addCounter = async function (counter) {
  try {
    var Counter = new this(counter)
    var result = await Counter.save(counter)
    return result
  } catch (err) {
    console.log(err)
  }
}

counterSchema.statics.getValue = async function (counterName) {
  try {
    const value = await this.find({ name: counterName })
    return value
  } catch (err) {
    console.log(err)
  }
}

counterSchema.statics.getAndIncrValue = async function (counterName, addValue) {
  try {
    const value = await this.findOneAndUpdate(
      { name: counterName },
      { $inc: { value: addValue } }
    )
    return value
  } catch (err) {
    console.log(err)
  }
}

const Counter = mongoose.model('Counter', counterSchema)

module.exports = Counter

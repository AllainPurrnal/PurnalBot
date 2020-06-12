const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BannedSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now()
  },
})

module.exports = Banned = mongoose.model('banned', BannedSchema);
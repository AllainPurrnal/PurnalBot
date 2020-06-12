const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  reportedBy: {
    type: String,
    required: true
  },
  reportedByID: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Report", reportSchema)
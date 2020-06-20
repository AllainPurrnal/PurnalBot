const axios = require('axios');
require('dotenv').config();

const proxy = process.env.PROXY + `/api/reports`;

exports.getReports = () => {
  return axios.get(`${proxy}`)
    .then(res => {
      // console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
};

exports.addReports = (report) => {
  return axios.post(`${proxy}`, {
    guildId: report.guildId,
    user: report.user,
    userId: report.userId,
    reason: report.reason,
    reportedBy: report.reportedBy,
    reportedById: report.reportedById
  })
    .catch(err => console.log(err))
}

// Call editReports(id, bool) and pass in an id to edit
// Example: editReports(`5ee820b68dd2317740d8b39d`)
exports.editReports = (id, message) => {
  return axios.put(`${proxy}/${id}`, {
     resolved: true
  })
    .then(res => {
      if (res.data.resolved) return message.channel.send('Report was already resolved.')
      message.channel.send('Report has been resolved.')
    })
    .catch(err => {
      console.log(err)
      message.channel.send(`An error occurred while resolving the report. Check server logs for more info. \n${err}`)
    })
}
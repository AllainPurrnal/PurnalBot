const axios = require('axios');
require('dotenv').config();

const proxy = '/api/reports';

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

exports.findReports = () => {
  return console.log(`GET`)
}
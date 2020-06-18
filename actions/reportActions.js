const axios = require('axios');
require('dotenv').config();

const proxy = process.env.PROXY;

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
exports.editReports = (id) => {
  return axios.put(`${proxy}/${id}`, {
    resolved: true
  })
    .then(res => {console.log(res.data)})
    .catch(err => {console.log(err)})
}
const axios = require('axios');
require('dotenv').config();

const proxy = process.env.PROXY + `/api/users`;

// Gets one users' profile from the database
exports.getUser = (id) => {
  return axios.get(`${proxy}`, {
    params: {
      discordId: id
    }
  })
    .then(res => {
      return res.data[0]
    })
    .catch(err => {
      return res.error(err)
    })
};

// Gets all of the guild's users
exports.getAllUsers = () => {
  return axios.get(`${proxy}`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      return res.error(err)
    })
}

exports.editUserProfile = (id, platform, username) => {
  return axios.put(`${proxy}`, {
    id: id,
    name: platform,
    username: username
  })
    .then(res => {
      console.log(`Axios Res: ${res.data}`)
      // return res.data
    })
    .catch(err => {
      console.log(`Axios Error: ${err}`)
    })
}
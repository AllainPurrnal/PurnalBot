const axios = require('axios');
require('dotenv').config();

const proxy = process.env.PROXY + '/api/games';

// Gets All available games in the Guild
exports.getGame = ( guildId ) => {
  return axios.get(`${proxy}`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      return res.error(err)
    })
}
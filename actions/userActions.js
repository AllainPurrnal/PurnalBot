const axios = require('axios');
require('dotenv').config();

const proxy = process.env.PROXY + `/api/users`;

exports.getUser = (message, id) => {
  return axios.get(`${proxy}`, {
    params: {
      discordId: id
    }
  })
    .then(res => {
      console.log(res.data[0])
    })
    .catch(err => {
      console.log(err)
      message.reply(`Can't find you in the database, please ask a Mod for assistance`)
    })
};


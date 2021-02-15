const axios = require('axios');

const cat = `https://aws.random.cat/meow`;

module.exports = {
  name: 'cat',
  description: `Get a random cat!`,
  execute(message) {
    axios.get(`${cat}`)
      .then(res => {
        message.channel.send(res.data.file)
      })
      .catch(err => {
        message.reply(`Woops, couldn't find a random cat 😿`)
      })
  }
}
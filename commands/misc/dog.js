const axios = require('axios');

const dog = `https://random.dog/woof.json`

module.exports = {
  name: 'dog',
  description: `Get a random dog!`,
  execute(message) {
    axios.get(`${dog}`)
      .then(res => {
        message.channel.send(res.data.url)
        // console.log(res.data.url)
      })
      .catch(err => {
        message.reply(`Woops, couldn't find a random dog`)
      })
  }
}
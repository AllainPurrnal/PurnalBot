const { getGame } = require("../../actions/gameActions")

module.exports = {
  name: 'newgame',
  description: 'Adds a new game and role to the server list',
  type: 'Moderation',
  execute(message, args) {
    console.log(`Args: ${args}`)
    let bool;

    getGame()
      .then(games => {
        games.map(game => {
          console.log(game.name)
          if(game.name === args) return console.log(`${game.name}`)
        })
      })

    // if(bool) return message.channel.send(`${args} is already in the database!`)

    // message.channel.send(`${args} was added.`)

    // 0. Should check if the game is already in the database
    // 1. Add Game to database if Game is not found
    // 2. 
  }
}
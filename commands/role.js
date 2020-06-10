const { Collection } = require('discord.js')

module.exports = {
  name: 'role',
  description: `Let's a user gain access to a specific game channel`,
  execute(message) {
    console.log(message.guild.roles.cache)
  }
}
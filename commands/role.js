const { Guild } = require('discord.js')


const guild = new Guild();

module.exports = {
  name: 'role',
  description: 'Lists the available roles in the server',
  execute(message) {
    console.log(message.guild.roles)
  }
}
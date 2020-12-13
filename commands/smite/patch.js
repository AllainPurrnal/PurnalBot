const { MessageEmbed } = require('discord.js');
require('dotenv').config();

module.exports = {
  name: 'patch',
  description: 'Creates a new post with Patch Notes information',
  execute(message, args) {
    return message.channel.send('Patch Notes!')
  }
}
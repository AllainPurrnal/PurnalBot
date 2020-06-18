module.exports = {
  name: 'server',
  description: 'Get Server Info',
  execute(message, args) {
    message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
  }
};
module.exports = {
  name: 'server',
  description: 'Get Server Info',
  execute(message) {
    message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
  }
};
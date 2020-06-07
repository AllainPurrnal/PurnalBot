module.exports = {
  name: 'kick',
  description: 'Kick a User',
  usage: `<@user>`,
  userPermissions: ['KICK_MEMBERS'],
  execute(message) {
    const member = message.mentions.members.first();
    // member.kick()
    message.channel.send(`${member} was kicked from the server`);
  }
}
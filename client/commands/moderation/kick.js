module.exports = {
  name: 'kick',
  description: 'Kick a User',
  usage: `[@User]`,
  execute(message) {
    
    // Permission check: If member does not have the required permission, exit with a message
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply(`You have no power here!`)

    const member = message.mentions.members.first();
    member.kick()
    message.channel.send(`${member} was kicked from the server`);
  }
}
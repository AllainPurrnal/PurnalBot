module.exports = {
  name: 'ban',
  description: 'Ban a User',
  usage: '[@User] [reason]',
  execute(message, args) {

    // Permission check: If member does not have the required permission, exit with a message
    if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply(`You have no power here!`)

    const member = message.mentions.members.first();
    const reason = args.slice(1).join(' ');

    // Requires a reason to ban
    if (!reason) return message.reply(`Please add a reason why you're banning ${member}`)

    member.ban({reason: `${reason}`})
    return message.channel.send(`${member} was banned from the server`)
  }
}
module.exports = {
  name: 'kick',
  description: 'Kicks a specified User',
  guildOnly: true,
  execute(message, args) {
    const user = getUserFromMention(args[0])

    if (!user) return message.reply('You forgot to mention someone!')

    message.channel.send(`You wanted to kick ${user}?`)
  }
}
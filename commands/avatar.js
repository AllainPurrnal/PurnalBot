module.exports = {
  name: 'avatar',
  aliases: ['icon', 'pic'],
  description: 'Get\'s a specified User\'s avatar',
  execute(message, args) {
    if (args[0]) {
      const user = getUserFromMention(args[0])

      if (!user) return 'You forgot to mention someone!'

      return message.channel.send(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true})}`)
    }

    return message.channel.send(`${message.author.username}, your avatar: ${message.author.displayAvatarURL({ dynamic: true })}`)
  }
}
module.exports = {
  name: 'purge',
  description: 'Deletes the number of specified messages',
  execute(message, args) {
    
    // Permission check: If member does not have the required permission, exit with a message
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`You have no power here!`)

    const amount = parseInt(args[0]) + 1

    if (isNaN(amount)) {
      return message.reply('Not a valid number')
    }
    else if (amount <= 1 || amount > 100) {
      return message.reply('You need to enter a number between 1 and 99')
    }

    message.channel.bulkDelete(amount, true)
    .catch( err => {
      console.error(err)
      message.channel.send('There was a problem with your prune command')
    })
  }
}
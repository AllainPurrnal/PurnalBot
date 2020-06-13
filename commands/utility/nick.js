module.exports = {
  name: 'nick',
  description: 'Changes your nickname',
  type: 'Utility',
  usage: '[nickname]',
  execute(message, args) {
    const nickname = args.join(' ');

    message.member.setNickname(`${nickname}`)
    return message.channel.send(`Henceforth, you will be known as ${nickname}`)
  } 
}
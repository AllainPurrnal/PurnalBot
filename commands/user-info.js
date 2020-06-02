module.exports = {
  name: 'user-info',
  description: 'Gets your info',
  execute(message, args) {
    message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
  }
};
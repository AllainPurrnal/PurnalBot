// imports the discord.js Client class
const Discord = require('discord.js');

// bot configuration file
const { prefix, token } = require('./config.json');

// creates a new Discord client
const client = new Discord.Client();

// when client is ready, run this code
// will only trigger once after logging in
client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', message => {
  // console.log(message);

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  // console.log(command)
  // https://discordjs.guide/creating-your-bot/commands-with-user-input.html#basic-arguments

  if (command === `ping`) return message.channel.send('Pong!');
  else if (command === 'beep') return message.channel.send('Boop!');
  else if (command === 'server') return message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
  else if (command === 'user-info') return (`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);

  else if (command === 'args-info') {
    if (!args.length) return message.channel.send(`You didn't provide any arguments, ${message.author}`);
    else if (args[0] === 'foo') return message.channel.send('bar');

    message.channel.send(`First argument: ${args[0]}`);
  };

})

// login to Discord
client.login(token);
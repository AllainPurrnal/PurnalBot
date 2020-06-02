const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command)
}

function getUserFromMention(mention) {
  // The id is the first and only match found by the RegEx.
  const matches = mention.match(/^<@!?(\d+)>$/)

  // If supplied variable was not a mention, matches will be null instead of an array.
  if (!matches) return;
  
  // However the first element in the matches array will be the entire mention, not just the ID,
	// so use index 1.
	const id = matches[1];

	return client.users.cache.get(id);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

  // If a command doesn't exist, exit early
  	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  
  	if (!command) return;

  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply('I can\'t execute that command inside DMs!');
  }

  if (command.args && !args.length) {
    let reply = `You didn't provide any agruments, ${message.author}`;

    if (command.args) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }
  
  // const now = Date.now();
  // const timestamps = cooldowns.get(command.name);
  // const cooldownAmount = (command.cooldown || 3) * 1000;

  // if (timestamps.has(message.author.id)) {
  //   const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
  
  //   if (now < expirationTime) {
  //     const timeLeft = (expirationTime - now) / 1000;
  //     return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
  //   }
  // }

  // timestamps.set(message.author.id, now);
  // setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  // If there is, .get() the command and call it's .execute() method while passing in your message and argsvariables as method arguments
  try {
    command.execute(message, args);
  }
  
  // In the event of an error, log it out and return to User
  catch (err) {
    console.error(err)
    message.reply('Ooops, I borked that command. Try again?')
  }
  
});

client.login(token);
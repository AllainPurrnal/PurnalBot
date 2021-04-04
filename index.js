const fs = require('fs');
const { Client, Collection } = require('discord.js');
const roleClaim = require('./commands/utility/roleClaim');
const firstMessage = require('./commands/utility/first-message.js')
require('dotenv').config();

const prefix = process.env.PREFIX;
const token = process.env.TOKEN;

const client = new Client();
const cooldowns = new Collection();
client.commands = new Collection();

// Iterates over Commands Folder to find the requested command
fs.readdirSync('./commands/').forEach(dir => {
  const commandFiles = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'))

  for (const file of commandFiles) {
    const command = require(`./commands/${dir}/${file}`);
    client.commands.set(command.name, command)
  }
});

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

  roleClaim(client);
});

client.on('message', message => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  // If a command doesn't exist, exit early
  if (!command) return;

  // Guild Only commands will return an error when PM'd a command
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

  // To keep track of command cooldowns and when to allow a user to enter the command again
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
  
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${prefix}${command.name}\` command.`);
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  // If there is, .get() the command and call it's .execute() method while passing in your message and args variables as method arguments
  try {
    command.execute(message, args, client);
  }
  
  // In the event of an error, log it out and return to User
  catch (err) {
    console.error(err)
    message.reply('Ooops, I borked that command. Try again?')
  }
  
});

client.login(token);
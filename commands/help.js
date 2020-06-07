require('dotenv').config();

let prefix = process.env.PREFIX;

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
    // const data = [];
    const { commands } = message.client;
    const helpCard = {
      color: `#FF00B4`,
      title: 'Commands',
      author: {
        name: 'The Litter Box',
        icon_url: 'https://i.imgur.com/SbvmSmR.jpg',
        // url: 'https://www.allainbernal.com'
      }
    }

    // Send list of commands in a PM
    if(!args.length) {
      helpCard.description = 'Here\'s a list of all my commands:';
      helpCard.footer = {text: `\nYou can send \`${prefix}help <command>\` to get info on a specific command!`}

      helpCard.fields = commands.map(command => {
        return {name: `${prefix}${command.name}`, value: `${command.description}`, inline: true}
      })

      return message.author.send({embed: helpCard})
      	.then(() => {
      		if (message.channel.type === 'dm') return;
      		message.reply('I slid into your DM\'s with all my commands!');
      	})
      	.catch(error => {
      		console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
      		message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
      	});
    }

    // Sends more info about a specific command
    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
    	return message.reply('that\'s not a valid command!');
    }

    helpCard.title = `${prefix}${command.name}`
    helpCard.description = `${command.description}`
    if (command.cooldown) helpCard.fields = {name: 'Cooldown', value: `${command.cooldown}`}
    if (command.usage) helpCard.fields = {name: 'Usage:', value: `${prefix}${command.name} ${command.usage}`}

    message.channel.send({embed: helpCard})
    
	},
};
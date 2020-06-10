const Discord = require('discord.js');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Reports');

module.exports.run = async (bot, message, args) => {
  console.log(message.member.roles.cache)
  
  await message.delete();
  if (message.author.id != '') return;
  let rUser = message.mentions.members.first();
  if (!rUser) return message.reply('Can\'t find that member');
  let rreason = args.slice(1).join(' ');
  if (!rreason) return message.reply('Please supply a reason')
};

module.exports.help = {
  name: 'testreport'
}
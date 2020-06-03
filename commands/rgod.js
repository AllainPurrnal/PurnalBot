const Discord = require('discord.js');
const { pantheon } = require('../smite.json');

module.exports = {
  name: 'rgod',
  description: 'Chooses a random god for SMITE',
  execute(message, args) {
    let godList = [];
    let name, title, icon, pan;

    pantheon.map(p => {
      p.gods.map(god => {
        return godList.push(god)
      })
    })
  
    let num = Math.floor(Math.random() * (godList.length - 1)) + 1
    name = godList[num].name;
    title = godList[num].title;
    icon = godList[num].icon;
    pan = godList[num].pantheon
    charClass = godList[num].class

    const color = () => {
      switch (charClass) {
        case 'Warrior':
          return `#de0000`
        case 'Mage':
          return `#b200de`
        case 'Hunter':
          return `#ff8c00`
        case 'Guardian':
          return `#44cc00`
        case 'Assassin':
          return `#ffff00`
        default: return `#FF00B4`
      } 
    }

    const godCard = new Discord.MessageEmbed()
      .setColor(color())
      .setTitle(`${name}`)
      .setDescription(`${title}`)
      .setThumbnail(`${icon}`)
      .addField('Pantheon', `${pan}`)
  
    return message.reply(godCard)

  }
}
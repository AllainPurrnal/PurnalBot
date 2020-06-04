const Discord = require('discord.js');
const { pantheon } = require('../smite.json');

let godList = [];

const buildCard = (message, godList) => {
  let num = Math.floor(Math.random() * (godList.length))
  let name = godList[num].name;
  let title = godList[num].title;
  let icon = godList[num].icon;
  let pan = godList[num].pantheon
  let cClass = godList[num].class

  const color = () => {
    switch (cClass) {
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
};

const randomGod = (message) => {
  godList = [];

  pantheon.map(p => {
    p.gods.map(god => {
      return godList.push(god)
    })
  })
  buildCard(message, godList)
};

const randomGodPantheon = (message, choice) => {
  godList = [];

  if (choice == 'great') {
    pantheon[4].gods.map(god => {
      // console.log(god.name)
      return godList.push(god)
    })

    // console.log(godList[0])
    return buildCard(message, godList)
  }

  let isChoice = ((p) => {
    return p.name.toLowerCase() === choice
  });

  let pan = pantheon.filter(isChoice)

  pan[0].gods.map((g) => {
    return godList.push(g)
  })

  // console.log(godList)
  buildCard(message, godList)
};

const randomGodClass = (message, choice) => {
  godList = [];

  pantheon.map(p => {
    p.gods.map(god => {
      return godList.push(god)
    })
  })

  let isChoice = ((p) => {
    return p.class.toLowerCase() === choice
  });

  godList = godList.filter(isChoice)

  buildCard(message, godList)
};

module.exports = {
  name: 'rgod',
  description: 'Chooses a random god for SMITE. Specify a Pantheon or Class for a narrowed random God.',
	usage: '<pantheon> || <class>',
  execute(message, args) {
    let choice;
    if (!args.length) choice = args
    else choice = args[0].toLowerCase();

    switch (choice) {
      case "arthurian":
      case "celtic":
      case "chinese":
      case "egyptian":
      case "great":
      case "greek":
      case "hinder":
      case "japanese":
      case "mayan":
      case "norse":
      case "polynesian":
      case "roman":
      case "slavic":
      case "voodoo":
      case "yoruba":
        return randomGodPantheon(message, choice)

      case "hunter":
      case "warrior":
      case "mage":
      case "guardian":
      case "assassin":
        return randomGodClass(message, choice)

      default: return randomGod(message)
    }

  }
}
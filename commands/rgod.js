const { MessageEmbed } = require('discord.js');
const { pantheon, role } = require('../smite.json');

let godList = [];
let num, name, title, icon, pan, gClass;

const buildGodCard = (message, godList) => {
  num = Math.floor(Math.random() * (godList.length))
  name = godList[num].name;
  title = godList[num].title;
  icon = godList[num].icon2;
  pan = godList[num].pantheon
  gClass = godList[num].class

  const color = () => {
    switch (gClass) {
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

  const godCard = new MessageEmbed()
    .setColor(color())
    .setTitle(`${name}`)
    .setDescription(`*${title}*`)
    .setThumbnail(`${icon}`)
    .addField('Pantheon', `*${pan}*`)

  return message.reply(godCard)
};

const buildRoleCard = (message, rRole) => {
  name = rRole.name;
  icon = rRole.icon;
  let desc = rRole.description

  const roleCard = new MessageEmbed()
    .setColor(`#FF00B4`)
    .setTitle(`${name}`)
    .setDescription(`${desc}`)
    .setThumbnail(`${icon}`)

  return message.reply(roleCard)
}

const randomGod = (message) => {
  godList = [];

  pantheon.map(p => {
    p.gods.map(god => {
      return godList.push(god)
    })
  })
  buildGodCard(message, godList)
};

const randomGodPantheon = (message, choice) => {
  godList = [];

  if (choice == 'great') {
    pantheon[4].gods.map(god => {
      // console.log(god.name)
      return godList.push(god)
    })

    // console.log(godList[0])
    return buildGodCard(message, godList)
  }

  let isChoice = ((p) => {
    return p.name.toLowerCase() === choice
  });

  let pan = pantheon.filter(isChoice)

  pan[0].gods.map((g) => {
    return godList.push(g)
  })

  // console.log(godList)
  buildGodCard(message, godList)
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

  buildGodCard(message, godList)
};

const randomRole = (message) => {
  let rand = Math.floor(Math.random() * (role.length))
  let rRole = role[rand]

  // console.log(rRole)

  buildRoleCard(message, rRole)
};

module.exports = {
  name: 'rgod',
  description: 'Chooses a random god for SMITE. Specify a Pantheon or Class for a narrowed random God.',
	usage: '<pantheon> || <class> || <role>',
  execute(message, args) {
    let choice;
    if (!args.length) choice = args
    else choice = args[0].toLowerCase();

    // console.log(message.author.username)

    switch (choice) {
      case "role":
        return randomRole(message);

      case "hunter":
      case "warrior":
      case "mage":
      case "guardian":
      case "assassin":
        return randomGodClass(message, choice)
          
      case "arthurian":
      case "celtic":
      case "chinese":
      case "egyptian":
      case "great":
      case "greek":
      case "hindu":
      case "japanese":
      case "mayan":
      case "norse":
      case "polynesian":
      case "roman":
      case "slavic":
      case "voodoo":
      case "yoruba":
        return randomGodPantheon(message, choice)

      default: return randomGod(message)
    }

  }
}
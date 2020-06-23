const { getUser } = require('../../actions/userActions');

const userCard = {
  color: `#21CBFC`,
  author: {
    name: 'The Litter Box',
    icon_url: 'https://i.imgur.com/SbvmSmR.jpg'
  },
  footer: `Use !profile [@user] to get more info`
}

const buildCard = (user) => {
  userCard.title = `${user.name}`
  userCard.fields = user.platform.map(platform => {
    return { name: `${platform.name}`, value: `${platform.username}`, inline: true }
  })
}

module.exports = {
  name: 'profile',
  description: `Get's the User's Discord Guild Profile`,
  type: 'Info',
  cooldown: 5,
  usage: '[optional @User]',
  execute(message, args) {
    
    if (args[0]) {
      let id = message.mentions.members.first().user.id;

      return getUser(id)
        .then( user => {
          buildCard(user);
          message.channel.send({ embed: userCard })
        })
        .catch(err => {
          console.log(err)
          message.channel.send(`An unknown error was encountered, please check the logs.`)
        })
    }
    
    // Todo: Fetch user avatar to post alongside their guild profile
    let id = `${message.author.id}`
    
    getUser(id)
      .then( user => {
        buildCard(user);
        message.channel.send({ embed: userCard })
      })
      .catch(err => {
        console.log(err)
        message.channel.send(`An unknown error was encountered, please check the logs.`)
      })
  }
}
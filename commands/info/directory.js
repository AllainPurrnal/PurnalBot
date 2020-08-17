const { getAllUsers } = require('../../actions/userActions');

const userCard = {
  color: `#21CBFC`,
  author: {
    name: 'The Litter Box',
    icon_url: 'https://i.imgur.com/SbvmSmR.jpg'
  },
  footer: {
    text: 'Use !profile [@user] to get more info'
  }
}

module.exports = {
  name: 'directory',
  description: 'Lists out a directory of User Profiles in the Guild Database',
  aliases: ['phonebook'],
  // cooldown: 60,
  execute(message) {
    // Need to add a filter to only output members of the guild
    getAllUsers()
      .then(users => {
        userCard.fields = users.map(user => {
          return { name: `${user.name}`, value: `*Platforms: ${user.platform.length}*`, inline: true }
        })
  
        message.channel.send({ embed: userCard })
      })
      .catch(err => {
        console.log(err)
        message.channel.send(`It's been borked!\nError: ${err}`)
      })
  }
}
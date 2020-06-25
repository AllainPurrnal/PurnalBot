const { editUserProfile, getUser } = require("../../actions/userActions");

module.exports = {
  name: 'addplatform',
  description: 'Adds a platform to the User\'s Guild Profile',
  type: 'Utility',
  usage: '[platform] [username]',
  execute(message, args) {
    if(!args[0]) return message.reply(`Please enter a platform to add!`)
    const platform = args[0].charAt(0).toUpperCase() + args[0].slice(1);

    if(!args[1]) return message.reply(`Please add your ${platform} username`)
    const username = `${args[1]}`;
      if(args[2]) username += ` ${args[2]}`
      
    const id = message.author.id

    let bool;

    getUser(id)
      .then(user => {
        user.platform.filter(plat => {
          if(plat.name === platform) return bool = true
        })
      })
      
    if(!bool) return message.reply(`You've already registered ${platform}`)

    // console.log(`Platform: ${platform}\nUsername: ${username}`)
    editUserProfile(id, platform, username)
    .then(res => {
      message.reply(`${platform} was succesfully added.`)
    })
    .catch(err => {
      console.log(err)
    })
  }
}
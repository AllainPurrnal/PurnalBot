const { addUser } = require('../../actions/userActions');

module.exports = {
  name: 'newuser',
  description: 'Creates a new Guild Profile for use with Tournaments and other functions',
  execute(message) {
    // console.log(message.author)
    let user = message.author;
    let guildId = message.guild.id;
    let name = `${user.username}#${user.discriminator}`;
    let discordId = user.id

    // Add a check to see if the user is already in the database

    addUser(guildId, name, discordId)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
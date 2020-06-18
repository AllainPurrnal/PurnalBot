module.exports = {
  name: 'role',
  description: `Let's a user gain access to a specific game channel`,
  execute(message) {
    let role = message.guild.roles.cache.forEach(r => console.log(r.name, r.id))
    console.log(role)

    // message.channel.send(`${role}`)
  }
}
module.exports = {
  name: 'addgame',
  description: 'Give\'s you access to a specific Game Category in the Server.',
  type: 'Utility',
  usage: '[game] / leave empty to see the list of active game channels',
  execute(message, args) {

    // Builds the roles array of all currently available in the guild
    // let roles = message.guild.roles.cache.map(role => {
    //   return role.name
    // })
    
    // if(args.length <= 0) return message.channel.send(`Available Games: ${roles}`)
    
    // args.map(game => {
    //   roles.filter(role => {
    //     if (role === game) return console.log(`Found: ${role}`)
    //   })
    // })
    
    // console.log(args.slice(1))

    // 0. Check to see if User has the requested Game Role
    // 1. Output all available games if no args are provided
    // 2. Take args and match with an available Guild Role
    // 4. Apply new Role if found
    // 5. Notify User if Role is not available
  }
}
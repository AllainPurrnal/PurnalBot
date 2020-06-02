const { pantheon } = require('../smite.json');

const randomGods = () => {
  let gods = pantheon.map(p => {
    return p.gods
  })

  let godList = gods.map(god => {
    return console.log(god)
  })
  
  console.log(gods)
  // console.log(godList)
}

module.exports = {
  name: 'rgod',
  description: 'Chooses a random god for SMITE',
  execute(message, args) {

    {randomGods()}
    
    // return message.reply(`${random.name}`)

  }
}
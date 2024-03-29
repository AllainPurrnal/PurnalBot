const firstMessage = require('./first-message.js');
require('dotenv').config();

const channelId = process.env.CHANNEL;
const userId = process.env.BOTID;

module.exports = (client) => {
  const getEmoji = (emojiName) => client.emojis.cache.find((emoji) => emoji.name === emojiName)

  const emojis = {
    // animalcrossing: 'Animal Crossing', destiny: 'Destiny', minecraft: 'Minecraft', smite: 'Smite', valheim: 'Valheim', valorant: 'Valorant'
    dice: 'Board Games', destiny: 'Destiny', minecraft: 'Minecraft', smite: 'Smite', valorant: 'Valorant'
  }

  const reactions = []

  let emojiText = `*How To: View a Category*\n* If you're interested in the following games/categories, just react with the corresponding icon to gain access to the channels!\n* Remove the reaction if you're no longer interested.\n------------------------------\n`

  for (const key in emojis) {
    const emoji = getEmoji(key)
    reactions.push(emoji)

    const role = emojis[key]
    emojiText += `${emoji} | ${role} \n`
  }

  firstMessage(client, channelId, emojiText, reactions)

  const handleReaction = (reaction, user, add) => {
    if (user.id === userId) {
      return
    }

    const emoji = reaction._emoji.name

    const { guild } = reaction.message

    const roleName = emojis[emoji]
    if (!roleName) {
      return
    }

    const role = guild.roles.cache.find((role) => role.name === roleName)
    const member = guild.members.cache.find((member) => member.id === user.id)

    if (add) {
      member.roles.add(role)
    } else {
      member.roles.remove(role)
    }
  }

  client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      handleReaction(reaction, user, true)
    }
  })

  client.on('messageReactionRemove', (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      handleReaction(reaction, user, false)
    }
  })
}
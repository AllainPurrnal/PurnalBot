const { addReports } = require('../../actions/reportActions');

module.exports = {
  name: 'report',
  description: 'Reports a user for violating server guidelines',
	type: 'Utility',
  // cooldown: 60,
  usage: '[@User] [reason for report]',
  execute(message, args) {
    const reporter = message.author;
    const reportee = message.mentions.members.first().user;

    const reason = args.slice(1).join(' ');

    if (reportee.bot) {
      if (reportee.username == 'Purnal') return message.reply(`You can't report me!`)

      return message.reply(`You can't do that, it's a bot!`);
    }

    if (!reason) return message.reply(`Please add a reason why you're reporting this User!`);

    let report = {
      guildId: message.guild.id,
      user: `${reportee.username}#${reportee.discriminator}`,
      userId: reportee.id,
      reason: reason,
      reportedBy: `${reporter.username}#${reporter.discriminator}`,
      reportedById: reporter.id
    }

    addReports(report)
      .then(
        message.reply(`Your report has been saved. Please wait while mods review your report.`)
      )
      .catch(error => {
        console.log(error)
        return message.reply(`There was an error with sending your report, please try again after cooldown.`)
      })

  }
}
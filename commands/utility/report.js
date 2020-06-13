const Report = require('../../models/Report');
module.exports = {
  name: 'report',
  description: 'Reports a user to the moderation team',
	type: 'Utility',
  cooldown: 60,
  usage: '[@User] [reason for report]',
  execute(message, args) {
    const reporter = message.author
    const reportee = message.mentions.members.first().user;

    const reason = args.slice(1).join(' ');

    if (reportee.bot) {
      if (reportee.username == 'Purnal') return message.reply(`You can't report me!`)

      return message.reply(`You can't do that, it's a bot!`);
    }

    if (!reason) return message.reply(`Please add a reason why you're reporting this User!`);

    const newReport = new Report({
      guildId: message.guild.id,
      user: reportee.username,
      userId: reportee.id,
      reason: reason,
      reportedBy: reporter.username,
      reportedById: reporter.id
    });

    newReport.save()
      .then(
        message.reply(`Your report has been saved. Please wait while mods review your report.`)
      )
      .catch(error => console.log(error));

  }
}
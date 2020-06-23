const { editReports } = require('../../actions/reportActions');

module.exports = {
  name: 'resolve',
  description: 'Resolves a user report',
  usage: `[report id]`,
  execute(message, args) {
    let reportId = args[0];
    
    editReports(reportId)
      .then(report => {
        if(report.resolved) return message.channel.send(`Report #${reportId.slice(17)} has already been resolved`)
        message.channel.send(`Report #${reportId.slice(17)} has been resolved.`)
      })
      .catch(err => {
        console.log(err)
        message.channel.send(`It's been borked!\nError: ${err}`)
      });
  }
}
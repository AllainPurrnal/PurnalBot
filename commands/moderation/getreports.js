const { getReports } = require('../../actions/reportActions');

const reportCard = {
  color: '#FF00B4',
  author: {
    name: 'The Litter Box',
    icon_url: 'https://i.imgur.com/SbvmSmR.jpg'
  }
}

module.exports = {
  name: 'getreports',
  description: 'Gets all unresolved user reports',
  type: 'Moderation',
  execute(message, args) {
    getReports()
      .then(res => {
        res.map(report => {
          // console.log(report._id)
          reportCard.title = `Report ID: ${report._id}`
          // reportCard.title = `Report ID: ${report._id.slice(17)}`
          reportCard.fields = [
            {
              name: `User:`,
              value: `${report.user}`,
              inline: true
            },
            {
              name: `Reported By:`,
              value: `${report.reportedBy}`,
              inline: true
            },
            {
              name: 'Reason:',
              value: `${report.reason}`
            }
          ]
          reportCard.footer = {text: `${report.date.toLocaleString()}`}

          message.channel.send({embed: reportCard})
        })
      })
      .catch(err => {
        console.log(err)
        return message.channel.send(`Error in getting reports! Please check the logs for more details`)
      })

    
  }
}
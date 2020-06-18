const { editReports } = require('../../actions/reportActions');

module.exports = {
  name: 'resolve',
  description: 'Resolves a user report',
  usage: `[report id]`,
  execute(message, args) {
    let reportId = args[0];
    
    editReports(reportId)
  }
}
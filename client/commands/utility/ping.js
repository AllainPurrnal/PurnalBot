const { editReports } = require('../../actions/reportActions');

module.exports = {
	name: 'ping',
	description: 'Ping!',
	type: 'Utility',
	cooldown: 5,
	execute(message) {
		message.channel.send('Pong')
	}
};
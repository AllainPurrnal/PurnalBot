const { getUser, getUsers } = require('../../actions/userActions');

module.exports = {
	name: 'ping',
	description: 'Ping!',
	type: 'Utility',
	cooldown: 5,
	execute(message) {
		message.channel.send('Pong')
	}
};
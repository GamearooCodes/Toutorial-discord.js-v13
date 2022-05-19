const { Client, Intents, Collection, Permissions } = require("discord.js");
const { beta } = require("../../config");

module.exports = {
	name: "int",
	async run(client, int) {
		const { commandName } = int;
		const interaction = int;

		if (!int.isCommand()) return null;

		let command = client.slash.get(commandName);

		var commands = client.application.commands;

		let devguild;

		if(beta) devguild = client.guilds.cache.get('936050113602793483');

		if(beta) commands = devguild.commands;
		if(!command) {

			interaction.reply('This command was removed from slash commands!');
			commands.delete(int.commandId).then(cmd => {
				console.log(`command not found so i removed it`)
			})

			return;
		}

		console.log(commandName)

		const permcheck = new Permissions(command.perm);

		if(!int.member.permissions.has(permcheck)) return int.reply(`Missing ${permcheck.toArray()}`).catch(err => {});

		let extras = {}

		command.command(int, client, extras)

		
	},
};

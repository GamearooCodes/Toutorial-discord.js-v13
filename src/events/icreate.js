const { Client, Intents, Collection, Permissions } = require("discord.js");

module.exports = {
	name: "int",
	async run(client, int) {
		const { commandName } = int;

		if (!int.isCommand()) return null;

		let command = client.slash.get(commandName);
		if(!command) return;

		const permcheck = new Permissions(command.perm);

		if(!int.member.permissions.has(permcheck)) return int.reply(`Missing ${permcheck.toArray()}`).catch(err => {});

		switch (commandName) {
			case "hello":
				client.slash.get("hello").command(int);
				break;
			case "8ball":
				client.slash.get("8ball").command(int);
		}
	},
};

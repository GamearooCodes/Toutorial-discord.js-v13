const { Client, Intents, Collection, Permissions } = require("discord.js");

module.exports = {
	name: "messageCreate",
	async execute(message, client, MessageEmbed) {
		if (message.author.bot) return;
                let prefix = client.config.prefix;

		if (!message.content.toLowerCase().startsWith(prefix)) return;

		let args = message.content.substring(prefix.length).split(" ");

		const cmd = args[0].toLowerCase();
		const command = client.commands.get(`${cmd}`);
		if (!command) return;

		const permissions = new Permissions(command.perm);

            if(!message.member.permissions.has(permissions)) return message.reply(`Missing ${permissions.toArray()}`).catch(err => {});
		command.execute(client, message, args, MessageEmbed);
	},
};

module.exports = {
	name: "messageCreate",
	async execute(message, client, MessageEmbed) {
		if (message.author.bot) return;
		let prefix = client.config.prefix;
		if (!message.content.toLowerCase().startsWith(prefix)) return;

		let args = message.content.substring(prefix.length).split(" ");

		switch (args[0]) {
			case "hello":
				message.reply({
					content: "Hello!",
					allowedMentions: { repliedUser: false },
				});
				break;
		}
	},
};

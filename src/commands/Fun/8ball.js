const axios = require("axios");
const { Permissions } = require("discord.js");
const ramapi = require("ram-api.js");
const { ramapiversion } = require("../../../config");
const { ramapikey } = require("../../../secure/token");

module.exports = {
	name: "8ball",
	desc: `Ask the bot a question`,
	category: "Fun",
	usage: "8balll [question]",
	perm: Permissions.FLAGS.ADMINISTRATOR,
	async execute(client, message, args, MessageEmbed) {
		if (!args[3])
			return message.reply({
				content: "Please ask a 3 word or more question!",
			});

		await ramapi.games._8ball(ramapiversion, ramapikey, "english")
			.then((data) => {
				message.reply({
					content: data.text,
					allowedMentions: { repliedUser: false },
				});
			})
			.catch((err) => {
				executeconsole(err, true, false);
			});
	},
};

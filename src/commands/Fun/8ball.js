const axios = require("axios");
const { api8ball, executeconsole } = require("ram-api.js");
const { ramapiversion } = require("../../../config");
const { ramapikey } = require("../../../secure/token");

module.exports = {
	name: "8ball",
	desc: `Ask the bot a question`,
	category: "Fun",
	usage: "8balll [question]",
	async execute(client, message, args, MessageEmbed) {
		if (!args[3])
			return message.reply({
				content: "Please ask a 3 word or more question!",
			});

		await api8ball(ramapiversion, ramapikey)
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

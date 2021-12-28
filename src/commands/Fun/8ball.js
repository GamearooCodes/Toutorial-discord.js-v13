const axios = require("axios");
const { api8ball } = require("ram-api.js");
const { apiversion, ramapiversion, ramapikey } = require("../../../config");

module.exports = {
	name: "8ball",
	desc: "ask the bot a question",
	category: "Fun",
	usage: "8ball",
	async execute(client, message, args, MessageEmbed) {
		if (!args[3])
			return message.reply({
				content: "Please ask a 3 or more word question!",
			});

		await api8ball(ramapiversion, ramapikey).then((data) => {
			//error it by adding .json() ^
			message.reply({
				content: data.text,
				allowedMentions: { repliedUser: false },
			});
		});
	},
};

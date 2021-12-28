const { apihello } = require("ram-api.js");
const { ramapiversion, ramapikey } = require("../../../config");

module.exports = {
	name: "hello",
	desc: "get a hello from the bot",
	category: "Fun",
	usage: "hello",
	async execute(client, message, args, MessageEmbed) {
		await apihello(ramapiversion, ramapikey).then((data) => {
			message.reply({
				content: data.text,
				allowedMentions: { repliedUser: true },
			});
		});
	},
};

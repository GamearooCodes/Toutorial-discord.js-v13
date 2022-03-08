const { Client, MessageEmbed, Message } = require("discord.js");
const { apihello, executeconsole, hello } = require("ram-api.js");
const { ramapiversion } = require("../../../config");
const { ramapikey } = require("../../../secure/token");

module.exports = {
	name: "hello",
	desc: "get a hello from the bot",
	category: "Fun",
	usage: "hello",
	/**
	 *
	 * @param {Client} client
	 * @param {Message} message
	 * @param {MessageEmbed} MessageEmbed
	 */
	async execute(client, message, args, MessageEmbed) {
		await hello(ramapiversion, ramapikey, "spanish")
			.then((data) => {
				message.reply({
					content: data.text,
					allowedMentions: { repliedUser: true },
				});
			})
			.catch((err) => {
				executeconsole(err, true, false);
				if (err === "An error has happened Too Many Requests") {
					return message.reply({
						content:
							"You are making too many requests as ram api has a 5 action per 5 seconds!",
					});
				} else {
					return message.reply({
						content: "An error has happened pleas e contact bot support!",
					});
				}
			});
	},
};

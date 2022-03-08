const { hello } = require("ram-api.js");
const { ramapiversion } = require("../../../config");
const { ramapikey } = require("../../../secure/token");
const { Interaction } = require("discord.js");

module.exports = {
	name: "hello",
	subcommands: [],
	usage: "hello",
	description: "Get a hello",
	/**
	 *
	 * @param {Interaction} interaction
	 */
	async command(interaction) {
		hello(ramapiversion, ramapikey).then((data) => {
			interaction.reply({ content: data.text });
		});
	},
};

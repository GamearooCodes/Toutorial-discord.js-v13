const ramapi = require("ram-api.js");
const { ramapiversion } = require("../../../config");
const { ramapikey } = require("../../../secure/token");
const { Interaction, Permissions } = require("discord.js");

module.exports = {
	name: "hello",
	subcommands: [],
	usage: "hello",
	description: "Get a hello",
	perm: Permissions.FLAGS.BAN_MEMBERS,
	/**
	 *
	 * @param {Interaction} interaction
	 */
	async command(interaction) {
		ramapi.fun.hello(ramapiversion, ramapikey).then((data) => {
			interaction.reply({ content: data.text });
		});
	},
};

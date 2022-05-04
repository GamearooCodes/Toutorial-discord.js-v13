const ramapi = require("ram-api.js");
const { ramapiversion } = require("../../../config");
const { ramapikey } = require("../../../secure/token");
const { Interaction, MessageEmbed, Permissions } = require("discord.js");

module.exports = {
	name: "8ball",
	subcommands: [],
	usage: "8ball [question]",
	description: "ask a question",
	perm: Permissions.FLAGS.ADMINISTRATOR,
	/**
	 *
	 * @param {Interaction} interaction
	 */
	async command(interaction) {
		const { options } = interaction;

		let q = options.getString("question");

		ramapi.games._8ball(ramapiversion, ramapikey).then((data) => {
			let embed = new MessageEmbed()
				.setColor("BLURPLE")
				.setDescription(`Question: ${q}\nAnswer: ${data.text}`);

			interaction.reply({ embeds: [embed] });
		});
	},
};

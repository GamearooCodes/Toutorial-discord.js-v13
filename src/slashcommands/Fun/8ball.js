const ramapi = require("ram-api.js");
const { ramapiversion } = require("../../../config");
const { ramapikey, apikey } = require("../../../secure/token");
const { Interaction, MessageEmbed, Permissions } = require("discord.js");

module.exports = {
	name: "fun",
	description: "Fun stuff",
	options: [
		{
			name: '8ball',
			description: 'Ask a bot a question',
			type: "SUB_COMMAND",
			options: [
				{
					name: "question",
					description: "question to ask",
					type: "STRING",
					required: true,
				}
			]
		}
	],

	/**
	 *
	 * @param {Interaction} interaction
	 */
	async command(interaction) {

		

		const { options } = interaction;

		const cmd = options.getSubcommand()

		switch (cmd) {
			case '8ball':
				let q = options.getString("question");

		ramapi.games._8ball(ramapiversion, apikey).then((data) => {
			let embed = new MessageEmbed()
				.setColor("BLURPLE")
				.setDescription(`Question: ${q}\nAnswer: ${data.text}`);

			interaction.reply({ embeds: [embed] });
		});
		break;
		}

		
	},
};

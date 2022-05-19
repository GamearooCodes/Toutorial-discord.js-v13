const axios = require("axios");

const {
	info
} = require("ram-api.js");

const { ramapiversion } = require("../../config");
const { Client } = require("discord.js");
const { consoleinfo } = require("discord-helper.js");

module.exports = {
	name: "ready",
	/**
	 *
	 * @param {*} version
	 * @param {Client} client
	 */
	async execute(version, client) {
		consoleinfo(`Ready! On Version: ${version}`);

		client.user.setPresence({
			activities: [
				{
					name: "Tutorials",
					type: "WATCHING",
				},
			],
			status: "dnd",
		});

		await check();

		

	},
};

async function check() {
	info.version_check(ramapiversion);
}

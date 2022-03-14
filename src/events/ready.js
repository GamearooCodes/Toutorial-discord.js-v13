const axios = require("axios");
const {
	apiversion,
	executeconsole,
	apiversioncheck,
	versioncheck,
	consoleinfo,
	consoleerror,
	consolewarn,
} = require("ram-api.js");

const { ramapiversion } = require("../../config");
const { Client } = require("discord.js");

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

		var commands = client.application.commands;

		commands?.create({
			name: "hello",
			description: "ask a question",
		});
		commands?.create({
			name: "8ball",
			description: "ask a question",
			options: [
				{
					name: "question",
					description: "question to ask",
					type: "STRING",
					required: true,
				},
			],
		});
	},
};

async function check() {
	versioncheck(ramapiversion)
		.then((data) => {
			let { version, supported, outdated, latest } = data;

			if (outdated) {
				if (!supported) {
					return consoleerror(
						`${version} is no longer supported latest version is ${latest}`
					);
				}
				consolewarn(
					`${version} is outdated but still supported latest version is ${latest}`
				);
			} else {
				consoleinfo(`${version} is the latest version for ram api`);
			}
		})
		.catch((err) => console.log(err));
}

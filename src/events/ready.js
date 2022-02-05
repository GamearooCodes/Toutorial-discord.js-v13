const axios = require("axios");
const { apiversion, executeconsole, apiversioncheck } = require("ram-api.js");

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
		executeconsole(`Ready! On Version: ${version}`, false, false);

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

		setInterval(() => {
			check();
		}, 60000);
	},
};

async function check() {
	apiversioncheck(ramapiversion).then((data) => {
		let { version, supported, outdated, latest } = data;

		if (outdated) {
			if (!supported) {
				return executeconsole(
					`${version} is no longer supported latest version is ${latest}`,
					true,
					false
				);
			}
			executeconsole(
				`${version} is outdated but still supported latest version is ${latest}`,
				false,
				true
			);
		} else {
			executeconsole(`${version} is the latest version for ram api`);
		}
	});
}

const axios = require("axios");
const { apiversion } = require("ram-api.js");
const { createLogger, format, transports, level } = require("winston");
const { consoleFormat } = require("winston-console-format");
const { ramapiversion } = require("../../config");
const { Client } = require("discord.js");

const logger = createLogger({
	level: "silly",
	format: format.combine(
		format.timestamp(),
		format.ms(),
		format.errors({ stack: true }),
		format.splat(),
		format.json()
	),
	defaultMeta: { service: "Test" },
	transports: [
		new transports.Console({
			format: format.combine(
				format.colorize({ all: true }),
				format.padLevels(),
				consoleFormat({
					showMeta: true,
					metaStrip: ["timestamp", "service"],
					inspectOptions: {
						depth: Infinity,
						colors: true,
						maxArrayLength: Infinity,
						breakLength: 120,
						compact: Infinity,
					},
				})
			),
		}),
	],
});

module.exports = {
	name: "ready",
	/**
	 *
	 * @param {*} version
	 * @param {Client} client
	 */
	async execute(version, client) {
		console.log(`Ready! On Version: ${version}`);

		client.user.setPresence({
			activities: [
				{
					name: "Tutorials",
					type: "WATCHING",
				},
			],
			status: "dnd",
		});

		apiversion(ramapiversion);

		setInterval(() => {
			apiversion(ramapiversion);
		}, 60000);
	},
};

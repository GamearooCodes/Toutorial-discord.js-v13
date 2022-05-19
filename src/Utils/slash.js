const { Client } = require("discord.js");
const { readdirSync } = require("fs");
const { beta } = require("../../config");
/**
 * 
 * @param {Client} client 
 */
module.exports = async (client) => {

	var commands = client.application.commands;

	if(beta) commands = client.guilds.cache.get("936050113602793483").commands;
	readdirSync("./src/slashcommands/").forEach((dir) => {
		// src -> commands -> Fun -> commandname.js
		const commands2 = readdirSync(`./src/slashcommands/${dir}/`).filter((f) =>
			f.endsWith(".js")
		);

		for (let file of commands2) {
			let pull = require(`../slashcommands/${dir}/${file}`);

			client.slash.set(pull.name, pull);

			let {name, options, description} = pull;

			commands?.create({
				name,
				description,
				options
			})


			console.log(`Loaded slash Command: ${file}`);
		}
	});
};

const { readdirSync } = require("fs");

module.exports = (client) => {
	readdirSync("./src/slashcommands/").forEach((dir) => {
		// src -> commands -> Fun -> commandname.js
		const commands = readdirSync(`./src/slashcommands/${dir}/`).filter((f) =>
			f.endsWith(".js")
		);

		for (let file of commands) {
			let pull = require(`../slashcommands/${dir}/${file}`);

			client.slash.set(pull.name, pull);

			console.log(`Loaded slash Command: ${file}`);
		}
	});
};

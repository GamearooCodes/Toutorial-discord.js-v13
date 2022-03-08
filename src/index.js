//require discord.js v13
const { Client, Intents, Collection, MessageEmbed } = require("discord.js");

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
}); //will add more intents

client.events = new Collection();

require("../rpc");

client.commands = new Collection();

client.slash = new Collection();

//config
const { prefix, version } = require("../config");
//token
const { token } = require("../secure/token");

["event", "command", "slash"].forEach((hand) => {
	require(`./Utils/${hand}`)(client);
});

//ready event

client.on("ready", async () => {
	await client.events.get("ready").execute(version, client);
});

//message event
client.on("messageCreate", async (message) => {
	client.config = {
		prefix,
		version,
	};
	await client.events
		.get("messageCreate")
		.execute(message, client, MessageEmbed);
});

client.on("interactionCreate", (int) => {
	client.slashconfig = {
		version,
	};
	client.events.get("int").run(client, int);
});

//logs in the bot

client.login(token);

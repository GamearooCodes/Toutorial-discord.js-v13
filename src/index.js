const { Client, Intents } = require("discord.js");
// the new client format

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
}); // will add more intents

//config
const { prefix } = require("../config");
//token
const { token } = require("../secure/token");

//ready event

client.on("ready", async () => {
	console.log("Ready!");
});

//message event
client.on("messageCreate", async (message) => {
	if (message.author.bot) return;
	if (!message.content.toLowerCase().startsWith(prefix)) return;

	let args = message.content.substring(prefix.length).split(" ");

	switch (args[0]) {
		case "hello":
			message.reply({
				content: "Hello!",
				allowedMentions: { repliedUser: false },
			});
			break;
	}
});

//logs in bot

client.login(token);

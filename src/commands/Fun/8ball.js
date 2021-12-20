const axios = require("axios");
const { apiversion } = require("../../../config");

module.exports = {
	name: "8ball",
	desc: "ask the bot a question",
	category: "Fun",
	usage: "8ball",
	async execute(client, message, args, MessageEmbed) {
		if (!args[3])
			return message.reply({
				content: "Please ask a 3 or more word question!",
			});

		await axios
			.get(`/8ball`, { baseURL: `https://ram.gamearoo.top/api/${apiversion}` })
			.then(async function (response) {
				if (response.data.Too_many_requests)
					return message.reply({
						content: response.data.Too_many_requests,
						allowedMentions: { repliedUser: false },
					});
				let text = await response.data.text;
				//error it by adding .json() ^
				message.reply({
					content: text,
					allowedMentions: { repliedUser: false },
				});
			})
			.catch((error) => {
				console.log(error);

				message.reply({
					content: `There was a error connecting to the ram api ${apiversion} ${error.response.statusText}`,
					allowedMentions: { repliedUser: false },
				});
			});
	},
};

module.exports = {
	name: "int",
	async run(client, int) {
		const { commandName } = int;

		if (!int.isCommand()) return null;

		switch (commandName) {
			case "hello":
				client.slash.get("hello").command(int);
				break;
			case "8ball":
				client.slash.get("8ball").command(int);
		}
	},
};

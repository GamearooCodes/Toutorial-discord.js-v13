const { Permissions, CommandInteraction, MessageEmbed } = require("discord.js");
const { logschannelid } = require("../../../config");
const ms = require('ms');

module.exports = {
    name: 'mod',
    description: 'Moderation command',
    options: [
        {
            name: 'timeout',
            description: 'Time Out a user',
            type: "SUB_COMMAND",
            options: [
                {
                    name: 'duration',
                    description: 'The time to timeout the user D|H|M|S',
                    type: 'STRING',
                    required: true,
                },
                {
                    name: 'user',
                    description: 'the user to timeout',
                    type: 'USER',
                    required: true,
                },
                {
                    name: 'reason',
                    description: 'the reason for the timeout',
                    type: 'STRING',
                    required: false
                }
            ]
        }
    ],
    perm: Permissions.FLAGS.MODERATE_MEMBERS,
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async command(interaction) {
        const { options, member, guild, channel } = interaction;

        const logchannel = guild.channels.cache.get(logschannelid);

        var embed = new MessageEmbed()
            .setTimestamp()
            .setFooter({ text: `Requested By: ${member.user.tag} (${member.id})`, iconURL: member.avatarURL({ dynamic: true }) })
            .setColor("RANDOM")
            .setTitle("Mod Action");
        var user = options.getMember('user') || member;
        if (user.id === member.id) return interaction.reply({ content: 'you can not perform mod actions on yourself', ephemeral: true })

        switch (options.getSubcommand()) {
            case "timeout":
                if (!member.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)) return interaction.reply({ content: 'You are missing moderate members perm', ephemeral: true });

                var time = ms(options.getString('duration')) || ms('1M') //1S 1M 1H 1D
                if (time >= 86400000) return interaction.reply({ content: 'You can only timeout a user for a max of 1 Day!', ephemeral: true });
                var reason = options.getString('reason') || 'No Reason Provided';

                user.timeout(time, reason);

                interaction.reply({
                    content: `Timed out ${user} for ${options.getString('duration')}`,
                    ephemeral: true
                });

                embed.setDescription(
                    `Timedout: ${user} \n Id: ${user.id
                    } \n Channel: ${channel} \n Duration: ${options.getString(
                        "duration"
                    )} \n Time: ${new Date()}  \n reason: ${reason}`
                );

                logchannel.send({ embeds: [embed] })


                break;
        }
    }
}
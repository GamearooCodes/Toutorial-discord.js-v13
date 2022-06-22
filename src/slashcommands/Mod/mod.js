const {
    Interaction,
    Client,
    Permissions,
    MessageEmbed,
    CommandInteraction,
} = require("discord.js");

const ms = require("ms");
const { logschannelid } = require("../../../config");
const warn = require("../../modules/warn");

async function formatDate(date) {
    var d = new Date(date);
    s;
    var hh = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var dd = "AM";
    var h = hh;
    if (h >= 12) {
        h = hh - 12;
        dd = "PM";
    }
    if (h == 0) {
        h = 12;
    }
    m = m < 10 ? "0" + m : m;

    s = s < 10 ? "0" + s : s;

    // if you want 2 digit hours:
    h = h < 10 ? "0" + h : h;

    var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);

    var replacement = h + ":" + m;
    // if you want to add seconds
    replacement += ":" + s;
    replacement += " " + dd;

    return date.toString().replace(pattern, replacement);
}
module.exports = {
    name: "mod",
    description: "Moderation commands",
    options: [
        {
            name: "timeout",
            description: "Time out a user",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "duration",
                    description: "The time to timeout the user D|H|M|S",
                    type: "STRING",
                    required: true,
                },
                {
                    name: "user",
                    description: "the user to timeout",
                    type: "USER",
                    required: true,
                },
                {
                    name: "reason",
                    description: "the reason for the timeout",
                    type: "STRING",
                    required: true,
                },
            ],
        },
        {
            name: "removetimeout",
            description: "Remove Timeout for a user",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "user",
                    description: "the user to remove the timeout",
                    type: "USER",
                    required: true,
                },
                {
                    name: "reason",
                    description: "the reason for the removing the timeout",
                    type: "STRING",
                    required: true,
                },
            ],
        },
        {
            name: "kick",
            description: "Kick a member",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "user",
                    description: "the user to kick",
                    type: "USER",
                    required: true,
                },
                {
                    name: "reason",
                    description: "the reason for the kick",
                    type: "STRING",
                    required: true,
                },
            ],
        },

        {
            name: "ban",
            description: "Ban a member",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "user",
                    description: "the user to ban",
                    type: "USER",
                    required: true,
                },
                {
                    name: "reason",
                    description: "the reason for the ban",
                    type: "STRING",
                    required: true,
                },
            ],
        },
        {
            name: "warn",
            description: "Warn a member",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "user",
                    description: "The user to warn",
                    type: "USER",
                    required: true,
                },
                {
                    name: "reason",
                    description: "The reason for the warn",
                    type: "STRING",
                    required: true,
                },
                {
                    name: "role",
                    description: "the role to give the member",
                    type: "ROLE",
                    required: false,
                },
            ],
        },
        {
            name: "unwarn",
            description: "UnWarn a member",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "user",
                    description: "The user to unwarn",
                    type: "USER",
                    required: true,
                },
                {
                    name: "reason",
                    description: "The reason for the unwarn",
                    type: "STRING",
                    required: true,
                },
                {
                    name: "warnid",
                    description: "The id of the warning user => apps =? warnings",
                    type: "STRING",
                    required: true,
                },
                {
                    name: "role",
                    description: "the role to remove from the member",
                    type: "ROLE",
                    required: false,
                },
            ],
        },
        {
            name: "clearchat",
            description: "clear the chat by a  amount",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "amount",
                    description: "the amount to clear",
                    type: "NUMBER",
                    required: true,
                },
            ],
        },
        {
            name: 'role',
            description: 'role options',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'action',
                    description: 'The action to take',
                    type: 'STRING',
                    required: true,
                    choices: [
                        {
                            name: 'give',
                            value: 'give'
                        },
                        {
                            name: 'remove',
                            value: 'remove',
                        },
                        {
                            name: 'has',
                            value: 'has'
                        }
                    ]
                },
                {
                    name: 'user',
                    description: 'the user',
                    type: "USER",
                    required: true,
                },
                {
                    name: 'role',
                    description: 'The role',
                    type: 'ROLE',
                    required: true
                },
                {
                    name: 'reason',
                    description: 'the reason',
                    type: 'STRING',
                    required: false,
                }
            ]
        },

    ],
    perm: Permissions.FLAGS.SEND_MESSAGES,
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async command(interaction, client) {
        const { options, member, guild, channel } = interaction;



        const logchannel = interaction.guild.channels.cache.get(logschannelid);

        var embed = new MessageEmbed()
            .setTimestamp()
            .setFooter(
                `Requested By: ${interaction.user.tag} (${interaction.user.id})`,
                interaction.member.avatarURL({ dynamic: true })
            )
            .setColor("RANDOM")
            .setTitle("Mod Action");

        switch (options.getSubcommand()) {
            case "unwarn":
                if (!member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
                    return interaction.reply({
                        content:
                            "You are missing the ``Manage Messages`` Perm! I can not warn the user for you",
                        ephemeral: true,
                    });
                var user5 = options.getMember("user");
                var reason6 = options.getString("reason");
                var role2 = options.getRole("role");

                if (role2) user5.roles.remove(role2);

                let data2 = await warn.findOne({
                    guildID: guild.id,
                    memberID: user5.id,
                });

                let staff2 = interaction.user.id;

                if (data2) {
                    let warnnumber2 = data2.warnings.length - 1;
                    var warningID = options.getString("warnid") - 1;

                    data2.warnings.splice(warningID);
                    data2.staff.splice(warningID);
                    data2.date.splice(warningID);

                    data2.save();
                    interaction.reply(`${user5} Warning was removed!`);

                    embed.setDescription(
                        `UnWarned: ${user5} \n Id: ${user5.id
                        } \n Channel: ${channel} \n Time: ${new Date()} \n Warning #${warnnumber2} \n Id removed: ${warningID} \n reason: ${reason6} `
                    );

                    logchannel.send({ embeds: [embed] });
                } else {
                    return interaction.reply({
                        content: "This user doesn't have any warnings",
                        ephemeral: true,
                    });
                }

                break;
            case "warn":
                if (!member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
                    return interaction.reply({
                        content:
                            "You are missing the ``Manage Messages`` Perm! I can not warn the user for you",
                        ephemeral: true,
                    });
                var user4 = options.getMember("user");
                var reason5 = options.getString("reason");
                var role = options.getRole("role");

                if (role) user4.roles.add(role);

                let data = await warn.findOne({
                    guildID: guild.id,
                    memberID: user4.id,
                });

                let staff = interaction.user.id;

                if (data) {
                    let warnnumber = data.warnings.length + 1;

                    data.warnings.push(reason5);
                    data.staff.push(staff);
                    data.date.push(new Date());
                    data.save();
                    interaction.reply(`${user4} has been warned for ${reason5}`);
                    embed.setDescription(
                        `Warned: ${user4} \n Id: ${user4.id
                        } \n Channel: ${channel} \n Time: ${new Date()} \n Warning #${warnnumber} \n reason: ${reason5}`
                    );
                    console.log(1);
                    logchannel.send({ embeds: [embed] });
                } else {
                    let newdata = new warn({
                        guildID: guild.id,
                        memberID: user4.id,
                        warnings: [reason5],
                        staff: [staff],
                        date: [new Date()],
                    });
                    await newdata.save();
                    interaction.reply(`${user4} has been warned for ${reason5}`);

                    embed.setDescription(
                        `Warned: ${user4} \n Id: ${user4.id
                        } \n Channel: ${channel} \n Time: ${new Date()} \n Warning #1 \n reason: ${reason5}`
                    );

                    logchannel.send({ embeds: [embed] });
                }
                break;
            case "ban":
                if (!member.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
                    return interaction.reply({
                        content:
                            "You are missing the ``Ban Members`` Perm! I can not ban the user for you",
                        ephemeral: true,
                    });

                var user3 = options.getMember("user");
                var reason4 = options.getString("reason");

                user3.ban({ reason: reason4 });

                interaction.reply({
                    content: `Banned ${user3}`,
                    ephemeral: true,
                });

                embed.setDescription(
                    `Banned: ${user3} \n Id: ${user3.id
                    } \n Channel: ${channel} \n Time: ${new Date()}  \n reason: ${reason4}`
                );

                logchannel.send({ embeds: [embed] });

                break;
            case "kick":
                if (!member.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
                    return interaction.reply({
                        content:
                            "You are missing the ``Kick Members`` Perm! I can not kick the user for you",
                        ephemeral: true,
                    });

                var user2 = options.getMember("user");
                var reason3 = options.getString("reason");

                user2.kick({ reason: reason3 });

                interaction.reply({
                    content: `Kicked ${user2}`,
                    ephemeral: true,
                });

                embed.setDescription(
                    `Kicked: ${user2} \n Id: ${user2.id
                    } \n Channel: ${channel} \n Time: ${new Date()}  \n reason: ${reason3}`
                );

                logchannel.send({ embeds: [embed] });

                break;
            case "clearchat":
                if (!member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
                    return interaction.reply({
                        content:
                            "You are missing the ``Manage Messages`` Perm! I can not clear the chat for you",
                        ephemeral: true,
                    });

                let amount = options.getNumber("amount");

                if (amount >= 101)
                    return interaction.reply({
                        content: "I can not clear more then 100 msgs at a time!",
                        ephemeral: true,
                    });

                await interaction.deferReply({ ephemeral: true });

                await new Promise((resolve) => setTimeout(resolve, 3000));

                channel.bulkDelete(amount, true);

                interaction.editReply(`Removed ${amount} messages!`);
                embed.setDescription(`Cleared ${amount} messages from ${channel}`);

                logchannel.send({ embeds: [embed] });

                break;
            case "role":
                if (!member.permissions.has(Permissions.FLAGS.MANAGE_ROLES))
                    return interaction.reply({
                        content:
                            "You are missing the ``MANAGE_ROLES`` Perm! I can not do this for you",
                        ephemeral: true,
                    });
                const memberac = options.getMember('user');
                const action = options.getString('action');
                const role22 = options.getRole('role');
                const reason22 = options.getString('reason') || " No Reason provided";

                switch (action) {
                    case "has":
                        let check = memberac.roles.cache.has(role22.id);

                        if (!check) check = "Does Not";
                        else check = "Does";

                        interaction.reply(`${memberac} ${check} have ${role22.name}`);
                        break;
                    case "give":
                        memberac.roles.add(role22, { reason: reason22 });

                        interaction.reply(`Added ${role22.name} to ${memberac} for ${reason22} `)

                        break;
                    case "remove":
                        memberac.roles.remove(role22, { reason: reason22 });

                        interaction.reply(`Removed ${role22.name} from ${memberac} for ${reason22}`)

                        break;
                }

                break;
            case "timeout":
                if (!member.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS))
                    return interaction.reply({
                        content:
                            "You are missing the ``Timeout members`` Perm! I can not timeout the user for you",
                        ephemeral: true,
                    });

                var time = ms(options.getString("duration"));
                var user = options.getMember("user");
                var reason = options.getString("reason");

                user.timeout(time, reason);

                interaction.reply({
                    content: `Timed out ${user} for ${options.getString("duration")}`,
                    ephemeral: true,
                });
                embed.setDescription(
                    `Timedout: ${user} \n Id: ${user.id
                    } \n Channel: ${channel} \n Duration: ${options.getString(
                        "duration"
                    )} \n Time: ${new Date()}  \n reason: ${reason}`
                );

                logchannel.send({ embeds: [embed] });
                break;
            case "removetimeout":
                if (!member.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS))
                    return interaction.reply({
                        content:
                            "You are missing the ``Timeout members`` Perm! I can not remove the timeout from the user for you",
                        ephemeral: true,
                    });

                var user = options.getMember("user");
                var reason2 = options.getString("reason");

                user.timeout(null, reason2);

                interaction.reply({
                    content: `Removed the Timed out from ${user}`,
                    ephemeral: true,
                });
                embed.setDescription(
                    `Removed Timeout: ${user} \n Id: ${user.id
                    } \n Channel: ${channel} \n Duration: 0S \n Time: ${new Date()}  \n reason: ${reason2}`
                );

                logchannel.send({ embeds: [embed] });
                break;
        }
    },
};

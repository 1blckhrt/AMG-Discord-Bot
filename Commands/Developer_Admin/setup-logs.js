const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ChannelType } = require("discord.js");
const logSchema = require("../../Schemas/logs");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("setup-logs")
    .setDescription("Sets up the logging channel.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
    .addChannelOption(option =>
        option.setName("channel")
        .setDescription("The channel for logging messages.")
        .setRequired(false)
        ),

        async execute (interaction) {
            if (!interaction.user.id === "800222752572702731" || !interaction.user.id === "854483188255686656" || !interaction.user.id === "808802276516954133") await interaction.reply({content: "You don't have permission to use this system!", ephemeral: true});
            const { channel, guildId, options } = interaction;

            const logChannel = options.getChannel("channel") ||  channel;
            const embed = new EmbedBuilder();

            logSchema.findOne({Guild: guildId}, async (err, data) => {
                if (!data) {
                    await logSchema.create({
                        Guild: guildId,
                        Channel: logChannel.id
                    });

                    embed.setDescription("Data was successfully sent to the database.")
                        .setColor("DarkButNotBlack")
                        .setTimestamp();
                } else if (data) {
                    logSchema.deleteOne({ Guild: guildId});
                    await logSchema.create({
                        Guild: guildId,
                        Channel: logChannel.id
                    });

                    embed.setDescription("Old data was successfully replaced with the new data.")
                        .setColor("DarkButNotBlack")
                        .setTimestamp();
                }

                if (err) {
                    embed.setDescription("Something went wrong. Please contact the developer of this bot.")
                        .setColor("Red")
                        .setTimestamp();
                }

                return await interaction.reply({embeds: [embed], ephemeral: true})
            })
        }
}
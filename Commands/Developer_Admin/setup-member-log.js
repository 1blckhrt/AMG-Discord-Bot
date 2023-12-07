const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder, ChannelType} = require("discord.js");
const database = require("../../Schemas/member-log");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("setup-member-log")
    .setDescription("Configure the member logging system for AMG. Developer only.")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption((options) => options
        .setName("log-channel")
        .setDescription("Select the logging channel for this system.")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    )
    .addRoleOption((options) => options
        .setName("member-role")
        .setDescription("Set the role to be automatically added to new members."))

    .addRoleOption((options) => options
        .setName("bot-role")
        .setDescription("Set the role to be automatically added to new bots.")),
        
    /**
     * @param {ChatInputCommandInteraction} interaction
     */

    async execute(interaction, client) {
        if (!interaction.user.id === "800222752572702731" || !interaction.user.id === "854483188255686656" || !interaction.user.id === "808802276516954133") await interaction.reply({content: "You don't have permission to use this system!", ephemeral: true});
        const { guild, options } = interaction;

        const logChannel = options.getChannel("log-channel").id;

        let memberRole = options.getRole("member-role") ?
        options.getRole("member-role").id : null;

        let botRole = options.getRole("bot-role") ?
        options.getRole("bot-role").id : null;

        await database.findOneAndUpdate(
            {Guild: guild.id},
            {logChannel: logChannel,
            memberRole: memberRole,
            botRole: botRole},
            {new: true, upsert: true});

    
        client.guildConfig.set(guild.id, {
                logChannel: logChannel,
                memberRole: memberRole,
                botRole: botRole
            });

        const embed = new EmbedBuilder()
        .setColor("DarkButNotBlack")
        .setDescription([
            `- Logging channel updated: <#${logChannel}>`,
            `- Member auto-role updated: ${memberRole ? `<@&${memberRole}>` : "Not Specified."}`,
            `- Bot auto-role updated: ${botRole ? `<@&${botRole}>` : "Not Specified."}`

        ].join("\n"));

        return interaction.reply({embeds: [embed]})
    
    }
}
const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("role-bypass")
    .setDescription("Assigns the member logging bypass role to a user.")
    .addUserOption(option =>
        option
            .setName("target")
            .setDescription("The member you would like to assign the bypass role to.")
            .setRequired(true)
        )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false),

    async execute (interaction, client) {
        const user = interaction.options.getUser("target");
        const roleUser = await interaction.guild.members.fetch(user.id);
        const role = "1049791824497225889";
        const logChannel = client.channels.cache.get("1157855805081669682");

        if (!user) return await interaction.reply({content: "The person mentioned is no longer within the server", ephemeral: true});
        if (roleUser.roles.cache.has(role)) return await interaction.reply({content: "This person already has this role!", ephemeral: true});
        
        await roleUser.roles.add(role);
        const icon = `${client.user.displayAvatarURL()}`;
        const embed = new EmbedBuilder()
        .setTitle("Add Role Executed!")
        .setColor("DarkButNotBlack")
        .setDescription(`${interaction.user} has added the **Member Log Bypass Role** to ${user}.`)
        .setAuthor({name: "AMG", iconURL: icon})
        .setTimestamp()

        await interaction.reply({embeds: [embed]});
        await logChannel.send({embeds: [embed]});
        
    }
}
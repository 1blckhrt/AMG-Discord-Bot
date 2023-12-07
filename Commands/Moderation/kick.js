const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Select a member and kick them.")
        .addUserOption(option =>
            option
                .setName("target")
                .setDescription("The member you would like to kick.")
                .setRequired(true))
        .addStringOption(option => option
                .setName("reason")
                .setDescription("The reason for kicking.")
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setDMPermission(false),

        async execute(interaction, client) {
            if (!interaction.member.permissions.has(PermissionsBitField.KickMembers)) return await interaction.reply({content: "You don't have permission to use this command!", ephemeral: true});
            const kickUser = interaction.options.getUser("target");
            const kickMember = await interaction.guild.members.fetch(kickUser.id);
            const logChannel = client.channels.cache.get("1157855805081669682");
            const target = interaction.options.getUser('target');
            const reason = interaction.options.getString('reason') ?? 'No reason provided';
            if (!kickUser) return await interaction.reply({content: "The user mentioned is no longer within the server", ephemeral: true});
            if (!kickMember) return await interaction.reply({content: "You cannot kick this person, they have higher roles above the bot or yourself!", ephemeral: true});
    
    
            const icon = `${client.user.displayAvatarURL()}`;
            const embed = new EmbedBuilder()
            .setTitle("Kick Executed!")
            .setColor("DarkButNotBlack")
            .setDescription(`${target} has been successfully kicked by ${interaction.user} for **${reason}**.`)
            .setAuthor({name: "AMG", iconURL: icon})
            .setTimestamp()

            const dmEmbed = new EmbedBuilder()
            .setTitle("Kick Notice")
            .setColor("DarkButNotBlack")
            .setDescription(`You have been kicked in ${interaction.guild.name} for ${reason}.`)
            .setAuthor({name: "AMG", iconURL: icon})
            .setTimestamp()


    await interaction.reply({embeds: [embed]});
    await kickMember.send({embeds: [dmEmbed]}).catch(err => {
        return;
    });
    await interaction.guild.members.kick(target);
    await logChannel.send({embeds: [embed]});
        },
}
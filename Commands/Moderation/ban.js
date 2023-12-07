const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Select a member and ban them.")
        .addUserOption(option =>
            option
                .setName("target")
                .setDescription("The member you would like to ban.")
                .setRequired(true))
        .addStringOption(option => option
                .setName("reason")
                .setDescription("The reason for banning.")
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),

        async execute(interaction, client) {
            if (!interaction.member.permissions.has(PermissionsBitField.BanMembers)) return await interaction.reply({content: "You don't have permission to use this command!", ephemeral: true});
            const target = interaction.options.getUser('target');
            const reason = interaction.options.getString('reason') ?? 'No reason provided';
            const banUser = interaction.options.getUser("target");
            const banMember = await interaction.guild.members.fetch(banUser.id);
            const logChannel = client.channels.cache.get("1157855805081669682");
    
            if (!banUser) return await interaction.reply({content: "The user mentioned is no longer within the server", ephemeral: true});
            if (!banMember) return await interaction.reply({content: "You cannot ban this person, they have higher roles above the bot or yourself!", ephemeral: true});
    
            const icon = `${client.user.displayAvatarURL()}`;
            const embed = new EmbedBuilder()
            .setTitle("Ban Executed!")
            .setColor("DarkButNotBlack")
            .setDescription(`${target} has been successfully banned by ${interaction.user} for ${reason}.`)
            .setAuthor({name: "AMG", iconURL: icon})
            .setTimestamp()

            const dmEmbed = new EmbedBuilder()
            .setTitle("Ban Notice")
            .setColor("DarkButNotBlack")
            .setDescription(`You have been banned in ${interaction.guild.name} for ${reason}.`)
            .setAuthor({name: "AMG", iconURL: icon})
            .setTimestamp()

            
    await interaction.reply({embeds: [embed]});
    await banMember.send({embeds: [dmEmbed]}).catch(err => {
        return;
    })
    await interaction.guild.members.ban(target);
    await logChannel.send({embeds: [embed]});
        },
}
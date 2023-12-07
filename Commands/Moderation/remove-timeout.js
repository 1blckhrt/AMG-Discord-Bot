const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, time, Embed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("remove-timeout")
    .setDescription("Untimes out a server member.")
    .addUserOption(option => option.setName("user").setDescription("The user you want to untimeout.").setRequired(true))
    .setDMPermission(false),
    async execute (interaction) {
        const icon = `${client.user.displayAvatarURL()}`;
        const timeUser = interaction.options.getUser("user");
        const timeMember = await interaction.guild.members.fetch(timeUser.id);
        const logChannel = client.channels.cache.get("1157855805081669682");

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return await interaction.reply({ content: "You must have the Admin role to use this command!", ephemeral: true})
        if (!timeMember) return await interaction.reply({ content: "The user you are trying to timeout is no longer in the server!", ephemeral: true});
        if (!timeMember.kickable) return await interaction.reply({ content: "I cannot untimeout this user! Their permissions are higher than me!", ephemeral: true});
        if (interaction.member.id === timeMember.id) return await interaction.reply({ content: "You cannot untimeout yourself!", ephemeral: true});
        if (timeMember.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "You cannot untimeout a person with the admin permission!", ephemeral: true});

        await timeMember.timeout(null);

        const embed = new EmbedBuilder()
        .setTitle("Timeout Removed!")
        .setColor("DarkButNotBlack")
        .setDescription(`${timeUser.tag}'s timeout has been removed by ${interaction.user}.`)
        .setAuthor({name: "r3sidence", iconURL: icon})
        .setTimestamp()

        const dmEmbed = new EmbedBuilder()
        .setTitle("Timeout Removed Notice")
        .setColor("DarkButNotBlack")
        .setDescription(`Your timeout in ${interaction.guild.name} has been removed.`)
        .setAuthor({name: "AMG", iconURL: icon})
        .setTimestamp()

        await timeMember.send({embeds: [dmEmbed]}).catch(err => {
            return;
        });

        await interaction.reply({embeds: [embed ]});
        await logChannel.send({embeds: [embed]});
    }
}
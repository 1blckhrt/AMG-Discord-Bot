const {SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("send-reaction-embeds")
    .setDescription("Sends the Reaction Role embeds to the channel the command is run in.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
    .addChannelOption(option =>
        option.setName("channel")
        .setDescription("The channel for sending the embed.")
        .setRequired(false)
        ),

    async execute (interaction, client) {
        if (!interaction.user.id === "800222752572702731" || !interaction.user.id === "854483188255686656" || !interaction.user.id === "808802276516954133") await interaction.reply({content: "You don't have permission to use this system!", ephemeral: true});
        const icon = `${client.user.displayAvatarURL()}`;
        const embedChannel = interaction.options.getChannel('channel');
        const embed = new EmbedBuilder()
        .setTitle("Pronoun Roles")
        .setColor("DarkButNotBlack")
        .addFields({ name: `He/Him`, value: ":orange_heart:", inline: true })
        .addFields({ name: `She/Her`, value: ":yellow_heart:", inline: true })
        .addFields({ name: `They/Them`, value: ":purple_heart:", inline: true })
        .addFields({ name: `Ask`, value: ":green_heart:", inline: true})
        .setAuthor({name: "AMG", iconURL: icon})
        .setTimestamp()

        const embed2 = new EmbedBuilder()
        .setTitle("Music Roles")
        .setColor("DarkButNotBlack")
        .addFields({ name: `Artist`, value: ":microphone2:", inline: true })
        .addFields({ name: `Producer`, value: ":musical_keyboard:", inline: true })
        .setAuthor({name: "AMG", iconURL: icon})
        .setTimestamp()

        await embedChannel.send({embeds: [embed, embed2]})
        await interaction.reply({content: "Embeds sent!", ephemeral: true});
    }

}
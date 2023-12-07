const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
    .setName("amg")
    .setDescription("Shows the AMG roster.")
    .setDMPermission(false),
    
    async execute (interaction, client) {
        const icon = `${client.user.displayAvatarURL()}`;
        const embed = new EmbedBuilder()
        .setColor('DarkButNotBlack')
        .setTimestamp()
        .setTitle('AMG Roster')
        .setAuthor({name: "AMG", iconURL: icon})
        .addFields({ name: `nferior`, value: `https://soundcloud.com/nferior`})
        .addFields({ name: `ikryb4by`, value: `https://soundcloud.com/ikryb4by`})
        .addFields({ name: `spirits`, value: `https://soundcloud.com/spiritss`})
        .addFields({ name: 'fisheyedom', value: `https://soundcloud.com/fisheyedom`})
        .addFields({ name: `sxbrd`, value: `https://soundcloud.com/sxbrd`})
        .addFields({ name: `devules`, value: `https://soundcloud.com/devules`})
        .addFields({ name: `takkunspalace`, value: `https://soundcloud.com/takkunspalace`})
        .addFields({ name: `atractixn`, value: `https://soundcloud.com/atractixn`})
        .addFields({ name: `Danex`, value: `https://soundcloud.com/danex0`})
        .addFields({ name: `mercyyy`, value: `https://soundcloud.com/mercycoreradio`})
        .addFields({ name: `au6ment`, value: `https://soundcloud.com/au6ment`})
        .addFields({ name: `crowlyyy`, value: `https://soundcloud.com/crowlyyy`})
        .setTimestamp()

        await interaction.reply({embeds: [embed]});
    }
}
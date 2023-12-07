const { SlashCommandBuilder, SelectMenuBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help-advanced')
    .setDescription('Get some help.'),
    async execute(interaction, client) {
        const icon = `${client.user.displayAvatarURL()}`;

        const helprow1 = new ActionRowBuilder()
        .addComponents(

            new StringSelectMenuBuilder()
            .setMinValues(1)
            .setMaxValues(1)
            .setCustomId('selecthelp')
            .setPlaceholder('• Select a menu')
            .addOptions(
                {
                    label: '• Help Center',
                    description: 'Navigate to the Help Center.',
                    value: 'helpcenter',
                },

                {
                    label: '• AMG Links',
                    description: 'Navigate to the AMG Links page.',
                    value: 'amgpage'
                },

                {
                    label: '• Commands',
                    description: 'Navigate to the Commands help page.',
                    value: 'commands',
                },
            ),
        );

        const centerembed = new EmbedBuilder()
        .setColor('DarkButNotBlack')
        .setTimestamp()
        .setTitle('> Help Center')
        .setAuthor({name: "AMG", iconURL: icon})
        .addFields({ name: `• Help Center`, value: `> Displays this menu.`})
        .addFields({ name: `• AMG Links`, value: `> Get information on AMG.`})
        .addFields({ name: `• Commands`, value: `> Get information on commands.`})
        .setTimestamp()

        await interaction.reply({ embeds: [centerembed], components: [helprow1] });
    }
}
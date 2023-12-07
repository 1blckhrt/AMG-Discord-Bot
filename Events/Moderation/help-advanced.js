const { ActionRowBuilder, Events, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ComponentType } = require('discord.js');

module.exports = {
name: Events.InteractionCreate,

async execute(interaction, client) {
    const icon = `${client.user.displayAvatarURL()}`;
    const helprow2 = new ActionRowBuilder()
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

    if (!interaction.isStringSelectMenu()) return;
    if (interaction.customId === 'selecthelp') {
        let choices = "";

        const centerembed = new EmbedBuilder()
        .setColor('DarkButNotBlack')
        .setTimestamp()
        .setTitle('> Help Center')
        .setAuthor({name: "AMG", iconURL: icon})
        .addFields({ name: `• Help Center`, value: `> Displays this menu.`})
        .addFields({ name: `• AMG Links`, value: `> Get information on AMG.`})
        .addFields({ name: `• Commands`, value: `> Get information on commands.`})

        interaction.values.forEach(async (value) => {
            choices += `${value}`;

            if (value === 'helpcenter') {

                await interaction.update({ embeds: [centerembed] });
            }

            if (value === 'amgpage') {

                const amgembed = new EmbedBuilder()
                    .setColor('DarkButNotBlack')
                    .setTimestamp()
                    .setTitle('> Links Page')
                    .setAuthor({name: "AMG", iconURL: icon})
                    .addFields({ name: `• Discord Server`, value: `> https://discord.gg/ahbu` })
                    .addFields({ name: `• Soundcloud Page`, value: `> https://soundcloud.com/ahbudahbi` })


                await interaction.update({ embeds: [amgembed] });
            }

            if (value === 'commands') {

                const commandpage1 = new EmbedBuilder()
                .setColor('DarkButNotBlack')
                .setTimestamp()
                .setTitle('> Public Commands')
                .setAuthor({name: "AMG", iconURL: icon})
                .addFields({ name: `• /help-advanced`, value: `> Opens up an advanced help guide.` })
                .addFields({ name: `• /bot-info`, value: `> Displays information about the AMG bot.` })
                .addFields({ name: `• /member-info`, value: `> Displays information about a specified member. Leave blank to view your own.` })
                .addFields({ name: `• /server-info`, value: `> Displays information about the server.` })
                .addFields({ name: `• /ping`, value: `> Pings the bot and makes it respond with Pong!` })
                .addFields({ name: `• /db-test`, value: `> Tests the database.` })

                const commandpage2 = new EmbedBuilder()
                .setColor('DarkButNotBlack')
                .setTimestamp()
                .setTitle('> Moderation Commands (Mods only)')
                .setAuthor({name: "AMG", iconURL: icon})
                .setFooter({ text: `You must have permissions to use these commands!` })
                .addFields({ name: `• /role-bypass`, value: `> Gives a user the Member Log Bypass` })
                .addFields({ name: `• /ban`, value: `> Bans the specified user.` })
                .addFields({ name: `• /unban`, value: `> Unbans the specified user using their ID.` })
                .addFields({ name: `• /kick`, value: `> Kicks a specified user.` })
                .addFields({ name: `• /timeout`, value: `> Times a user out.` })
                .addFields({ name: `• /remove-timeout`, value: `> Removes a user's timeout.` })
                .addFields({ name: `• /slowmode`, value: `> Toggles slowmode in a specified channel.` })

                const commandbuttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('helpcenterbutton')
                    .setLabel('Help Center')
                    .setStyle(ButtonStyle.Success),

                    new ButtonBuilder()
                    .setCustomId('spacer')
                    .setLabel('<>')
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Secondary),

                    new ButtonBuilder()
                    .setCustomId('pageleft')
                    .setLabel('◀')
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Success),

                    new ButtonBuilder()
                    .setCustomId('pageright')
                    .setLabel('▶')
                    .setStyle(ButtonStyle.Success)
                )

                const commandbuttons1 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId('helpcenterbutton1')
                        .setLabel('Help Center')
                        .setStyle(ButtonStyle.Success),

                        new ButtonBuilder()
                        .setCustomId('spacer1')
                        .setLabel('<>')
                        .setDisabled(true)
                        .setStyle(ButtonStyle.Secondary),

                        new ButtonBuilder()
                        .setCustomId('pageleft1')
                        .setLabel('◀')
                        .setDisabled(false)
                        .setStyle(ButtonStyle.Success),

                        new ButtonBuilder()
                        .setCustomId('pageright1')
                        .setDisabled(true)
                        .setLabel('▶')
                        .setStyle(ButtonStyle.Success)
                    )

                interaction.update({ embeds: [commandpage1], components: [commandbuttons] });
                const commandsmessage = interaction.message;
                const collector = commandsmessage.createMessageComponentCollector({ componentType: ComponentType.Button });

                collector.on('collect', async i => {
            
                    if (i.customId === 'spacer') {
                        
                        return;
                
                    }
                
                    if (i.customId === 'helpcenterbutton') {
                
                        await i.update({ embeds: [centerembed], components: [helprow2] });
                
                    }
                
                    if (i.customId === 'pageleft') {
                
                        await i.update({ embeds: [commandpage1], components: [commandbuttons] });
                
                    }
                
                    if (i.customId === 'pageright') {
                
                        await i.update({ embeds: [commandpage2], components: [commandbuttons1] });
                
                    }
                
                    if (i.customId === 'helpcenterbutton1') {
                
                        await i.update({ embeds: [centerembed], components: [helprow2] });
                
                    }
                
                    if (i.customId === 'pageright1') {
                
                        await i.update({ embeds: [commandpage2], components: [commandbuttons1] });
                
                    }
                
                    if (i.customId === 'pageleft1') {
                
                        await i.update({ embeds: [commandpage1], components: [commandbuttons] });
                
                    }
                })
            }
        })
    }
}
}
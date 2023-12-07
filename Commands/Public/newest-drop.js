const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
    .setName("newest-drop")
    .setDescription("Shows the newest AMG drop."),
    async execute (interaction, client) {

        let channel = client.channels.cache.get('1045159339406659624');
        const messages = await channel.messages.fetch({ limit: 8 });
        const linkMessage = messages.find(message => {
            return message.content.includes("soundcloud.com")
        });

        if (linkMessage) {
            const fullLinkMessage = linkMessage.content;
            const icon = `${client.user.displayAvatarURL()}`;
            const embed = new EmbedBuilder()
            .setColor('DarkButNotBlack')
            .setTimestamp()
            .setTitle('Newest Drop')
            .setAuthor({name: "AMG", iconURL: icon})
            .setDescription(fullLinkMessage)
            .setTimestamp()
        
                await interaction.reply({embeds: [embed]});
            } else {
                await interaction.reply({content: "Couldn't find a link!", ephemeral: true});
            }
    }}
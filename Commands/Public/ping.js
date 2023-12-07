const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder} = require("discord.js");

module.exports = {
data: new SlashCommandBuilder()
.setName("ping")
.setDescription("Ping! Pong!"),
/**
 * @param {ChatInputCommandInteraction} interaction
 */
async execute(interaction, client) {
    const icon = `${client.user.displayAvatarURL()}`;
    const embed = new EmbedBuilder()
    .setTitle("Ping Executed!")
    .setColor("DarkButNotBlack")
    .setDescription(`${interaction.user}, Pong!`)
    .setAuthor({name: "AMG", iconURL: icon})
    .setTimestamp()

await interaction.reply({embeds: [embed]});
}
}
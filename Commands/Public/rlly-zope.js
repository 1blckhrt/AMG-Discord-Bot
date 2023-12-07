const { AttachmentBuilder, SlashCommandBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
    .setName("rllyzope")
    .setDescription("zope moment"),
    async execute (interaction) {
    const image = new AttachmentBuilder("https://cdn.discordapp.com/attachments/1178913068755976242/1178919105265410108/IMG_9528.png?ex=6577e4f9&is=65656ff9&hm=9e4d60a74566933938de55396ae1883c98c6d69211c3de2cdfed98614ad48f15&", "zope.png")
    await interaction.reply({ files: [image]});
}}
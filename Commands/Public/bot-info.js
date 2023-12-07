const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonRowBuilder, ButtonStyle, ButtonBuilder, Embed } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
    .setName("bot-info")
    .setDescription("View information about the AMG bot."),
    async execute (interaction, client) {

        const icon = `${client.user.displayAvatarURL()}`;
        let serverCount = await client.guilds.cache.reduce((a, b) => a+b.memberCount, 0);

        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        let uptime = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel("Discord Server")
            .setStyle(ButtonStyle.Link)
            .setURL("https://discord.gg/ahbu"),

            new ButtonBuilder()
            .setLabel("SoundCloud Page")
            .setStyle(ButtonStyle.Link)
            .setURL("https://soundcloud.com/ahbudahbi"),
   
        )

        let ping = `${Date.now() - interaction.createdTimestamp}ms.`;

        const embed = new EmbedBuilder()
        .setTitle("Bot Info")
        .setColor("DarkButNotBlack")
        .setAuthor({name: "AMG", iconURL: icon})
        .setThumbnail(`${icon}`)
        .setFooter({text: "A custom Discord bot coded by blckhrt for the AMG server."})
        .addFields({ name: "Commands:", value: `${client.commands.size}`, inline: true})
        .addFields({ name: "Latency", value: `${ping}`, inline: true})
        .addFields({ name: "Uptime", value: `<t:${parseInt(client.readyTimestamp / 1000,10)}:R>`, inline: true})
        .addFields({ name: "CPU Usage", value: `${(process.memoryUsage().heapUsed /1024 /1024).toFixed(2)}%`, inline: true})
        .setTimestamp()

        await interaction.reply({embeds: [embed], components: [row]});
    
    }
}
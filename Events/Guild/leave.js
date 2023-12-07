const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
    name: Events.GuildMemberRemove,
    once: false,
    async execute (member, client) {
        const channelID = "1150170936545386516";
        const channel = client.channels.cache.get(channelID);

        const icon = `${client.user.displayAvatarURL()}`;
        const embed = new EmbedBuilder()
        .setTitle("Someone has left...")
        .setColor("DarkButNotBlack")
        .setDescription(`${member.user} just left...`)
        .setAuthor({name: "AMG", iconURL: icon})
        .setTimestamp()

        channel.send({embeds: [embed]});

        function updateMemberCount(guild) {
            const channel = guild.channels.cache.get('1085415330765094912');
            
            if (channel) {
                channel.setName(`zombies: ${guild.memberCount.toLocaleString()}`);
            } else {
                console.error("Channel not found.")
            }
        }
        updateMemberCount(member.guild);
    }};
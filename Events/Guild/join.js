const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,
    async execute (member, client) {
        const channelID = "1150170936545386516";
        const channel = client.channels.cache.get(channelID);

        const icon = `${client.user.displayAvatarURL()}`;
        const embed = new EmbedBuilder()
        .setTitle("Someone has joined!")
        .setColor("DarkButNotBlack")
        .setDescription(`welcome ${member.user} to #AMG!`)
        .setAuthor({name: "AMG", iconURL: icon})
        .setTimestamp()

        channel.send({embeds: [embed]});

        function updateMemberCount(guild) {
            const memberCount = guild.memberCount;
            const channel = guild.channels.cache.get('1085415330765094912');
            
            if (channel) {
                channel.setName(`zombies: ${memberCount}`);
            } else {
                console.error("Channel not found.")
            }
        }
        updateMemberCount(member.guild);
    }};
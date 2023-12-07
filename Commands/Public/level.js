const {SlashCommandBuilder, AttachmentBuilder} = require("discord.js");
const Level = require("../../Schemas/level");
const canvacord = require("canvacord");
const calculateLevelXP = require("../../Utilities/calculate-xp");
module.exports = {
    data: new SlashCommandBuilder()
    .setName("level")
    .setDescription("Displays the specified user's current level.")
    .setDMPermission(false)
    .addUserOption(option => option.setName("user").setDescription("The user to get the level of").setRequired(false)),

    async execute (interaction) {
        const targetUser = interaction.options.getUser("user");
        const targetUserId = targetUser || interaction.user.id;
        const targetUserObj = await interaction.guild.members.fetch(targetUserId);

        const fetchedLevel = await Level.findOne({ userId: targetUserId, guildId: interaction.guild.id });

        if (!fetchedLevel) return await interaction.reply({content: targetUserID ? `${targetUserId} doesn't have any levels!` : `You don't have any levels!`});

        let allLevels = await Level.find({ guildId: interaction.guild.id }).select('-_id Userid level xp');

        allLevels.sort((a, b) => {
            if (a.level === b.level) {
                return b.xp - a.xp;
            } else { 
                return b.level - a.level;
            }
        });

        let currentRank = allLevels.findIndex((lvl) => lvl.userid === targetUserId) + 1;
        const rank = new canvacord.Rank()
        .setAvatar(targetUserObj.user.displayAvatarURL({size: 256}))
        .setRank(currentRank)
        .setLevel(fetchedLevel.level)
        .setCurrentXP(fetchedLevel.xp)
        .setRequiredXP(calculateLevelXP(fetchedLevel.level))
        .setStatus(targetUserObj.presence.status)
        .setProgressBar(`#FFC300`, 'COLOR')
        .setUsername(targetUserObj.user.username)

        const data = await rank.build();
        const attachment = new AttachmentBuilder(data);
        interaction.reply({ files: [attachment]})
    }};

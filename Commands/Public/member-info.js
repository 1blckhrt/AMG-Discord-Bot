const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, BaseChannel} = require("discord.js");
const { profileImage } = require("discord-arts");
module.exports = {
    data: new SlashCommandBuilder()
    .setName("member-info")
    .setDescription("View information about a user.")
    .setDMPermission(false)
    .addUserOption((option) => option
        .setName("member")
        .setDescription("View a member's information. Leave empty to view your own.")
    ),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply()
        const member = interaction.options.getMember("member") || interaction.member;

        if (member.user.bot) return interaction.editReply({
            embeds:
            [
                new EmbedBuilder().setDescription("Please use /bot-info to view information about the AMG bot.")
            ],
            ephemeral: true
        });

        try {
            const fetchedMembers = await interaction.guild.members.fetch();
            const profileBuffer = await profileImage(member.id);
            const imageAttachment = new AttachmentBuilder(profileBuffer, { name: "profile.png"});
            const joinPosition = Array.from(fetchedMembers
            .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
            .keys())
            .indexOf(member.id) + 1;

            const topRoles = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role)
            .slice(0, 3);

            const userBadges = member.user.flags.toArray()

            const joinTime = parseInt(member.joinedTimestamp / 1000);
            const createdTime = parseInt(member.user.createdTimestamp / 1000);

            const Embed = new EmbedBuilder()
            .setAuthor({name: `${member.user.tag} | General Information`, iconURL: member.displayAvatarURL()})
            .setColor(member.displayColor)
            .setDescription(`On <t:${joinTime}:D>, ${member.user.username} joined as the **${addSuffix(joinPosition)}** member of this guild.`)
            .setImage("attachment://profile.png")
            .addFields([
             {name: "Created", value: `<t:${createdTime}:R>`, inline: true},
             {name: "Joined", value: `<t:${joinTime}:R>`, inline: true},
             {name: "Identifier", value: `${member.id}`, inline:false},
            ]); 

            interaction.editReply({embeds: [Embed], files: [imageAttachment]});

        } catch (error) {
            interaction.editReply({content: "An error occurred. Pleae contact the developer."});
            
            throw error;


}}};

function addSuffix(number) {
    if(number % 100 >= 11 && number % 100 <= 13)
    return number + "th";

    switch(number % 10) {
        case 1: return number + "st";
        case 2: return number + "nd";
        case 3: return number + "rd";
    }
    return number + "th";
};
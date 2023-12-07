const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const testSchema = require("../../Schemas/test");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("db-test")
    .setDescription("Tests the database."),
    async execute (interaction, client) {
        testSchema.findOne({GuildID: interaction.guild.id, UserID: interaction.user.id}, async (err, data) => {
            if (err) throw err;

            if (!data) {
                testSchema.create({
                    GuildID: interaction.guild.id,
                    UserID: interaction.user.id
                })
            }

            if (data) {
                const icon = `${client.user.displayAvatarURL()}`;
                const embed = new EmbedBuilder()
                .setTitle("Database Test Executed!")
                .setColor("DarkButNotBlack")
                .setDescription(`${interaction.user}, the database has been tested and is functioning properly.`)
                .setAuthor({name: "AMG", iconURL: icon})
                .setTimestamp()

                await interaction.reply({embeds: [embed]});
                
                const user = data.UserID;
                const guild = data.GuildID;

                console.log({ user, guild })
            }
        })
    }
}
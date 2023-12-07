const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
    .setName("shutdown")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
    .setDescription("Shuts down the AMG bot."),
    async execute (interaction, client) {
        if (!interaction.user.id === "800222752572702731" || !interaction.user.id === "854483188255686656" || !interaction.user.id === "808802276516954133") await interaction.reply({content: "You must be the developer of this bot to run this command!", ephemeral: true});
        else {
            const embed = new EmbedBuilder()
            .setColor("DarkButNotBlack")
            .setDescription(`:white_check_mark: The AMG bot has been shutdown!`)
            console.log(interaction.user.id + " has shut down the bot.")

            await interaction.reply({ content: "Shutting down your bot...", ephemeral: true});

            setTimeout( async () => {
                await interaction.editReply({content: ``, embeds: [embed]});
                client.destroy()
            }, 2000)
        }
    }
}
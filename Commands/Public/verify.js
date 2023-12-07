const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Verifies your account and gives you access to the rest of the server.")
    .setDMPermission(false),

    async execute (interaction) {
        const verifyRole = "1049791824497225889";

        if (interaction.member.roles.cache.has(verifyRole)) {
            interaction.reply({content: "You've already been verified!", ephemeral: true})
        } else {
            await interaction.member.roles.add(verifyRole);
            interaction.reply({content: "welcome to AMG!"})
        }
    }};

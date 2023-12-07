const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, Client, Options} = require("discord.js");
const { loadCommands } = require("../../Handlers/commandHandler");
const { loadEvents } = require("../../Handlers/eventHandler");
module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Reloads your commands/events.")
        .addSubcommand((options) => options
        .setName("events")
        .setDescription("Reloads your events."))
        .addSubcommand((options) => options
        .setName("commands")
        .setDescription("Reloads your commands")),
        /**
         * @param {ChatInputCommandInteraction} interaction
         * @param {Client} client
         */
        async execute(interaction, client) {
            if (!interaction.user.id === "800222752572702731" || !interaction.user.id === "854483188255686656" || !interaction.user.id === "808802276516954133") await interaction.reply({content: "You don't have permission to use this system!", ephemeral: true});
            const subCommand = interaction.options.getSubcommand();

            switch(subCommand) {
                case "events" : {
                    for( const [key, value] of client.events )
                    client.removeListener(`${key}`, value, true);
                    loadEvents(client);
                    interaction.reply({content: "Reloaded Events", ephemeral: true})
                    
                }
                break;
                case "commands" : {
                    loadCommands(client);
                    interaction.reply({content: "Reloaded Commands", ephemeral: true});
                }
                break;

                }
            }
        }
// eslint-disable-next-line no-unused-vars
const { Client, Events } = require("discord.js");
const { loadCommands } = require("../../Handlers/commandHandler");
const { connect } = require("mongoose");
const { handleLogs } = require("../../Handlers/logHandler");
module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        await loadCommands(client);
        await handleLogs(client);
        connect(client.config.MONGODB_URL, {
        }).then(() => console.log("#AMG has connected and is now online."))


    }
};
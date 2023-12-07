// eslint-disable-next-line no-unused-vars
const { Client, GatewayIntentBits, Partials, Collection, Guild, ActivityType, Events} = require("discord.js");
const client = new Client({
    intents: [Object.keys(GatewayIntentBits), "Guilds", "GuildMessages"],
    partials: [Object.keys(Partials)],
    presence: {activities: [{name: "AMG Radio", type:ActivityType.Listening}], status: "dnd"}
});
const logs = require("discord-logs");
const { handleLogs } = require("./Handlers/logHandler");
const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");
logs(client, {
    debug: true
});
require("./Handlers/AntiCrash.js")(client);

client.config = require("./config.json");
const {token} = require("./config.json");
client.events = new Collection();
client.commands = new Collection();
client.guildConfig = new Collection();

loadEvents(client);

client.login(client.config.token);


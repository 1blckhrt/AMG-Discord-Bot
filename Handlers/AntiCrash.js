const { EmbedBuilder, WebhookClient } = require("discord.js");
const { inspect } = require("util");
const clog = new WebhookClient({
    url: "https://discord.com/api/webhooks/1156277008725180547/huJuJZ4FDeFTMDPWdrHonyUdwscEXmHMGLwE07Sea_rUcv-bH1ugWyjgHxIoPZ0nuqo8"
});

module.exports = (client) => {
    const error = new EmbedBuilder()
        .setColor("Red")
        .setTimestamp();

    client.on("error", (err) => {
        error.setTitle("Discord API Error")
        error.setURL("https://discordjs.guide/popular-topics/errors.html#api-errors")
        error.setDescription(`\`\`\`${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\``)
        console.log(err)
        return clog.send({ embeds: [error] });
    });

    process.on("unhandledRejection", (reason, promise) => {
        error.setTitle("**Unhandled Rejection/Catch**")
        error.setURL("https://nodejs.org/api/process.html#event-unhandledrejection")
        error.addFields([
            { name: "Reason", value: `\`\`\`${inspect(reason, { depth: 0 }).slice(0, 1000)}\`\`\`` },
            { name: "Promise", value: `\`\`\`${inspect(promise, { depth: 0 }).slice(0, 1000)}\`\`\`` },
        ])
        console.log(reason, "\n", promise)
        return clog.send({ embeds: [error] });
    });

    process.on("uncaughtException", (err, origin) => {

        error.setTitle("**Uncaught Exception/Catch**")
        error.setURL("https://nodejs.org/api/process.html#event-uncaughtexception")
        error.addFields([
            { name: "Error", value: `\`\`\`${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\`` },
            { name: "Origin", value: `\`\`\`${inspect(origin, { depth: 0 }).slice(0, 1000)}\`\`\`` },
        ])
        console.log(err, "\n", origin)
        return clog.send({ embeds: [error] });
    });

    process.on("uncaughtExceptionMonitor", (err, origin) => {

        error.setTitle("**Uncaught Exception Monitor**")
        error.setURL("https://nodejs.org/api/process.html#event-uncaughtexceptionmonitor")
        error.addFields([
            { name: "Error", value: `\`\`\`${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\`` },
            { name: "Origin", value: `\`\`\`${inspect(origin, { depth: 0 }).slice(0, 1000)}\`\`\`` },
        ])
        console.log(err, "\n", origin)
        return clog.send({ embeds: [error] });
    });

    process.on("warning", (warn) => {

        error.setTitle("**Uncaught Exception Monitor Warning**")
        error.setURL("https://nodejs.org/api/process.html#event-warning")
        error.addFields([
            { name: "Warning", value: `\`\`\`${inspect(warn, { depth: 0 }).slice(0, 1000)}\`\`\`` },
        ])
        console.log(warn)
        return clog.send({ embeds: [error] });
    });
};
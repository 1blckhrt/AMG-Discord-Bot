// eslint-disable-next-line no-unused-vars
const { Client, Message, Events, EmbedBuilder } = require('discord.js');
const Level = require('../../Schemas/level.js');
const calculateLevelXP = require('../../Utilities/calculate-xp.js');
const cooldowns = new Set();

function getRandomXP(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {

    name: Events.MessageCreate,
    once: false,

    /**
    * 
    * @param {Client} client 
    * @param {Message} message 
    */

    async execute(message, client) {
        // eslint-disable-next-line no-unused-vars
        const pingMessage = message.author;
        if (!message.inGuild()) return;
        if (message.author.bot) return;
        if (cooldowns.has(message.author.id)) return;

        const xpToGive = getRandomXP(5, 50);

        const query = {
            userId: message.author.id,
            guildId: message.guild.id,
        };

        const level = await Level.findOne(query);

        if (level) {
            level.xp += xpToGive;

            if (level.xp > calculateLevelXP(level.level)) {
                level.xp = 0;
                level.level += 1;

                const icon = `${client.user.displayAvatarURL()}`;
                const embed = new EmbedBuilder()
                    .setTitle("Level Up!")
                    .setColor("DarkButNotBlack")
                    .setDescription(`${message.author} You have leveled up to level ${level.level}!`)
                    .setAuthor({ name: "AMG", iconURL: icon })
                    .setTimestamp()

                await client.channels.cache.get("1104924723688775780").send({embeds: [embed] });

                const role1 = message.guild.roles.cache.get("1104916475896143922");
                const role2 = message.guild.roles.cache.get("1104919586110976020");
        
                if (level.level === 5 ) {
                    message.member.roles.add(role1);
                }
        
                if (level.level === 10 ) {
                    message.member.roles.add(role2);
                }
            }

            await level.save().catch((error) => {
                console.log(`Error saving level ${error}`);
                return;
            });

            cooldowns.add(message.author.id);
            setTimeout(() => cooldowns.delete(message.author.id), 60000);

        }

        else {
            const newLevel = Level({
                userId: message.author.id,
                guildId: message.guild.id,
                xp: xpToGive,
            });

            await newLevel.save();

            setTimeout(() => cooldowns.delete(message.author.id), 60000);

        } 
       }
};

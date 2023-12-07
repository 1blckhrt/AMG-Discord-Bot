const { EmbedBuilder } = require("discord.js");

function handleLogs(client) {
    const logSchema = require("../Schemas/logs");

    function send_log(guildId, embed) {
        logSchema.findOne({ Guild: guildId }, async (err, data) => {
            if (!data || !data.Channel) return;
            const LogChannel = client.channels.cache.get(data.Channel);
            
            if(!LogChannel) return;
            embed.setTimestamp();
            
            try {
            LogChannel.send({ embeds: [embed] });
            } catch(err) {
                console.log(err);
            }
        });
    }

    client.on("messageDelete", function (message) {
        if (message.author.bot) return;

        const embed = new EmbedBuilder()
            .setTitle('Message Deleted')
            .setColor("DarkButNotBlack")
            .setDescription(`
            **Author : ** <@${message.author.id}> - *${message.author.tag}*
            **Date : ** ${message.createdAt}
            **Channel : ** <#${message.channel.id}> - *${message.channel.name}*
            **Deleted Message : **\`${message.content.replace(/`/g, "'")}\`
         `);

        return send_log(message.guild.id, embed);
    });

    // Channel Topic Updating 
    client.on("guildChannelTopicUpdate", (channel, oldTopic, newTopic) => {

        const embed = new EmbedBuilder()
            .setTitle('Topic Updated!')
            .setColor("DarkButNotBlack")
            .setDescription(`${channel} Topic changed from **${oldTopic}** to **${newTopic}**`);

        return send_log(channel.guild.id, embed);

    });

    // Channel Permission Updating
    client.on("guildChannelPermissionsUpdate", (channel, oldPermissions, newPermissions) => {

        const embed = new EmbedBuilder()
            .setTitle('Permission Updated!')
            .setColor("DarkButNotBlack")
            .setDescription(channel.name + 's permissions updated!');

        return send_log(channel.guild.id, embed);

    })

    // unhandled Guild Channel Update
    client.on("unhandledGuildChannelUpdate", (oldChannel, newChannel) => {

        const embed = new EmbedBuilder()
            .setTitle('Channel Updated!')
            .setColor("DarkButNotBlack")
            .setDescription("Channel '" + oldChannel.id + "' was edited but discord-logs couldn't find what was updated...");

        return send_log(oldChannel.guild.id, embed);

    });

    // Member Started Boosting
    client.on("guildMemberBoost", (member) => {

        const embed = new EmbedBuilder()
            .setTitle('User Started Boosting!')
            .setColor("DarkButNotBlack")
            .setDescription(`**${member.user.tag}** has started boosting  ${member.guild.name}!`);
        return send_log(member.guild.id, embed);

    })

    // Member Unboosted
    client.on("guildMemberUnboost", (member) => {

        const embed = new EmbedBuilder()
            .setTitle('User Stopped Boosting!')
            .setColor("DarkButNotBlack")
            .setDescription(`**${member.user.tag}** has stopped boosting  ${member.guild.name}!`);

        return send_log(member.guild.id, embed);

    })

    // Member Got Role
    client.on("guildMemberRoleAdd", (member, role) => {

        const embed = new EmbedBuilder()
            .setTitle('User Got Role!')
            .setColor("DarkButNotBlack")
            .setDescription(`**${member.user.tag}** got the role \`${role.name}\``);

        return send_log(member.guild.id, embed);

    })

    // Member Lost Role
    client.on("guildMemberRoleRemove", (member, role) => {

        const embed = new EmbedBuilder()
            .setTitle('User Lost Role!')
            .setColor("DarkButNotBlack")
            .setDescription(`**${member.user.tag}** lost the role \`${role.name}\``);

        return send_log(member.guild.id, embed);

    })

    // Nickname Changed
    client.on("guildMemberNicknameUpdate", (member, oldNickname, newNickname) => {

        const embed = new EmbedBuilder()
            .setTitle('Nickname Updated')
            .setColor("DarkButNotBlack")
            .setDescription(`${member.user.tag} changed nickname from \`${oldNickname}\` to \`${newNickname}\``);

        return send_log(member.guild.id, embed);

    })

    // Member Joined
    client.on("guildMemberAdd", (member) => {

        const embed = new EmbedBuilder()
            .setTitle('User Joined')
            .setColor("DarkButNotBlack")
            .setDescription(`Member: ${member.user} (\`${member.user.id}\`)\n\`${member.user.tag}\``,
                member.user.displayAvatarURL({ dynamic: true }));

        return send_log(member.guild.id, embed);

    });

    // Member Joined
    client.on("guildMemberRemove", (member) => {

        const embed = new EmbedBuilder()
            .setTitle('User Left')
            .setColor("DarkButNotBlack")
            .setDescription(`Member: ${member.user} (\`${member.user.id}\`)\n\`${member.user.tag}\``,
                member.user.displayAvatarURL({ dynamic: true }));

        return send_log(member.guild.id, embed);

    });

    // Server Boost Level Up
    client.on("guildBoostLevelUp", (guild, oldLevel, newLevel) => {

        const embed = new EmbedBuilder()
            .setTitle('Server Boost Level Up')
            .setColor("DarkButNotBlack")
            .setDescription(`${guild.name} reached the boost level ${newLevel}`);

        return send_log(guild.id, embed);

    })

    // Server Boost Level Down
    client.on("guildBoostLevelDown", (guild, oldLevel, newLevel) => {

        const embed = new EmbedBuilder()
            .setTitle('Server Boost Level Down')
            .setColor("DarkButNotBlack")
            .setDescription(`${guild.name} lost a level from ${oldLevel} to ${newLevel}`);

        return send_log(guild.id, embed);

    })

    // Banner Added
    client.on("guildBannerAdd", (guild, bannerURL) => {

        const embed = new EmbedBuilder()
            .setTitle('Server Got a new banner')
            .setColor("DarkButNotBlack")
            .setImage(bannerURL)

        return send_log(guild.id, embed);

    })

    // AFK Channel Added
    client.on("guildAfkChannelAdd", (guild, afkChannel) => {

        const embed = new EmbedBuilder()
            .setTitle('AFK Channel Added')
            .setColor("DarkButNotBlack")
            .setDescription(`${guild.name} has a new afk channel ${afkChannel}`);

        return send_log(guild.id, embed);

    })

    // Guild Vanity Add
    client.on("guildVanityURLAdd", (guild, vanityURL) => {

        const embed = new EmbedBuilder()
            .setTitle('Vanity Link Added')
            .setColor("DarkButNotBlack")
            .setDescription(`${guild.name} has a vanity link ${vanityURL}`);

        return send_log(guild.id, embed);

    })

    // Guild Vanity Remove
    client.on("guildVanityURLRemove", (guild, vanityURL) => {

        const embed = new EmbedBuilder()
            .setTitle('Vanity Link Removed')
            .setColor("DarkButNotBlack")
            .setDescription(`${guild.name} has removed its vanity URL ${vanityURL}`);

        return send_log(guild.id, embed);

    })

    // Guild Vanity Link Updated
    client.on("guildVanityURLUpdate", (guild, oldVanityURL, newVanityURL) => {

        const embed = new EmbedBuilder()
            .setTitle('Vanity Link Updated')
            .setColor("DarkButNotBlack")
            .setDescription(`${guild.name} has changed its vanity URL from ${oldVanityURL} to ${newVanityURL}!`);

        return send_log(guild.id, embed);

    })

    // Message Pinned
    client.on("messagePinned", (message) => {

        const embed = new EmbedBuilder()
            .setTitle('Message Pinned')
            .setColor("DarkButNotBlack")
            .setDescription(`${message} has been pinned by ${message.author}`);

        return send_log(message.guild.id, embed);

    })

    // Message Edited
    client.on("messageContentEdited", (message, oldContent, newContent) => {

        const embed = new EmbedBuilder()
            .setTitle('Message Edited')
            .setColor("DarkButNotBlack")
            .setDescription(`${message.author} edited \`${oldContent}\` to \n \`${newContent}\``);

        return send_log(message.guild.id, embed);

    })

    // Role Position Updated
    client.on("rolePositionUpdate", (role, oldPosition, newPosition) => {

        const embed = new EmbedBuilder()
            .setTitle('Role Position Updated')
            .setColor("DarkButNotBlack")
            .setDescription(role.name + " role was at position " + oldPosition + " and now is at position " + newPosition);

        return send_log(role.guild.id, embed);

    })

    // Role Permission Updated
    client.on("rolePermissionsUpdate", (role, oldPermissions, newPermissions) => {

        const embed = new EmbedBuilder()
            .setTitle('Role Permission Updated')
            .setColor("DarkButNotBlack")
            .setDescription(role.name + " had as permissions " + oldPermissions + " and now has as permissions " + newPermissions);

        return send_log(role.guild.id, embed);

    })
    
    // Username Updated
    client.on("userUsernameUpdate", (user, oldUsername, newUsername) => {

        const embed = new EmbedBuilder()
            .setTitle('Username Updated')
            .setColor("DarkButNotBlack")
            .setDescription(`${user.tag} updated their username from ${oldUsername} to ${newUsername}`);

        return send_log(user.guild.id, embed);

    })

    // Discriminator Updated
    client.on("userDiscriminatorUpdate", (user, oldDiscriminator, newDiscriminator) => {

        const embed = new EmbedBuilder()
            .setTitle('Discriminator Updated')
            .setColor("DarkButNotBlack")
            .setDescription(`${user.tag} updated their discriminator from ${oldDiscriminator} to ${oldDiscriminator}`);

        return send_log(user.guild.id, embed);

    })

    // Joined VC
    client.on("voiceChannelJoin", (member, channel) => {

        const embed = new EmbedBuilder()
            .setTitle('Voice Channel Joined')
            .setColor("DarkButNotBlack")
            .setDescription(member.user.tag + " joined " + `${channel}` + "!");

        return send_log(member.guild.id, embed);

    })

    // Left VC
    client.on("voiceChannelLeave", (member, channel) => {

        const embed = new EmbedBuilder()
            .setTitle('Voice Channel Left')
            .setColor("DarkButNotBlack")
            .setDescription(member.user.tag + " left " + `${channel}` + "!");

        return send_log(member.guild.id, embed);

    })

    // VC Switch
    client.on("voiceChannelSwitch", (member, oldChannel, newChannel) => {

        const embed = new EmbedBuilder()
            .setTitle('Voice Channel Switched')
            .setColor("DarkButNotBlack")
            .setDescription(member.user.tag + " left " + oldChannel.name + " and joined " + newChannel.name + "!");

        return send_log(member.guild.id, embed);

    })

    // VC Mute
    client.on("voiceChannelMute", (member, muteType) => {

        const embed = new EmbedBuilder()
            .setTitle('User Muted')
            .setColor("DarkButNotBlack")
            .setDescription(member.user.tag + " became muted! (type: " + muteType + ")");

        return send_log(member.guild.id, embed);

    })

    // VC Unmute
    client.on("voiceChannelUnmute", (member, oldMuteType) => {

        const embed = new EmbedBuilder()
            .setTitle('User Unmuted')
            .setColor("DarkButNotBlack")
            .setDescription(member.user.tag + " became unmuted!");

        return send_log(member.guild.id, embed);

    })

    // VC Defean
    client.on("voiceChannelDeaf", (member, deafType) => {

        const embed = new EmbedBuilder()
            .setTitle('User Deafened')
            .setColor("DarkButNotBlack")
            .setDescription(member.user.tag + " become deafed!");

        return send_log(member.guild.id, embed);

    })

    // VC Undefean
    client.on("voiceChannelUndeaf", (member, deafType) => {

        const embed = new EmbedBuilder()
            .setTitle('User Undeafened')
            .setColor("DarkButNotBlack")
            .setDescription(member.user.tag + " become undeafed!");

        return send_log(member.guild.id, embed);

    })

    // Role Created
    client.on("roleCreate", (role) => {

        const embed = new EmbedBuilder()
            .setTitle('Role Added')
            .setColor("DarkButNotBlack")
            .setDescription(`Role: ${role}\nRolename: ${role.name}\nRoleID: ${role.id}\nHEX Code: ${role.hexColor}\nPosition: ${role.position}`);

        return send_log(role.guild.id, embed);

    });

    // Role Deleted
    client.on("roleDelete", (role) => {

        const embed = new EmbedBuilder()
            .setTitle('Role Deleted')
            .setColor("DarkButNotBlack")
            .setDescription(`Role: ${role}\nRolename: ${role.name}\nRoleID: ${role.id}\nHEX Code: ${role.hexColor}\nPosition: ${role.position}`);

        return send_log(role.guild.id, embed);

    });

    // User Banned
    client.on("guildBanAdd", ({guild, user}) => {

        const embed = new EmbedBuilder()
            .setTitle('User Banned')
            .setColor("DarkButNotBlack")
            .setDescription(`User: ${user} (\`${user.id}\`)\n\`${user.tag}\``,
                user.displayAvatarURL({ dynamic: true }));

        return send_log(guild.id, embed);

    });

    // User Unbanned
    client.on("guildBanRemove", ({guild, user}) => {

        const embed = new EmbedBuilder()
            .setTitle('User Unbanned')
            .setColor("DarkButNotBlack")
            .setDescription(`User: ${user} (\`${user.id}\`)\n\`${user.tag}\``,
                user.displayAvatarURL({ dynamic: true }));

        return send_log(guild.id, embed);

    });

    // Channel Created
    client.on("channelCreate", (channel) => {

        const embed = new EmbedBuilder()
            .setTitle('Channel Created')
            .setColor("DarkButNotBlack")
            .setDescription(`${channel.name} has been created.`);

        return send_log(channel.guild.id, embed);

    });

    // Channel Deleted
    client.on("channelDelete", (channel) => {

        const embed = new EmbedBuilder()
            .setTitle('Channel Deleted')
            .setColor("DarkButNotBlack")
            .setDescription(`${channel.name} has been deleted.`);

        return send_log(channel.guild.id, embed);

    });
}

module.exports = { handleLogs };
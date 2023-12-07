const {SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, StringSelectMenuBuilder, ChannelType} = require('discord.js')
const reactionSchema = require('../../Schemas/reaction-role');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reaction-role-panel')
        .setDescription('Sends the reaction role panel to a specified channel.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)
        .addChannelOption(option => option.setName('channel').setDescription('The channel you are sending the panel to.').addChannelTypes(ChannelType.GuildText).setRequired(true)),

    async execute(interaction, client) {
        if (!interaction.user.id === "800222752572702731" || !interaction.user.id === "854483188255686656" || !interaction.user.id === "808802276516954133") await interaction.reply({content: "You don't have permission to use this system!", ephemeral: true});
        const icon = `${client.user.displayAvatarURL()}`;
        const {options, guildId, guild, channel} = interaction;

        const panelChannel = options.getChannel('channel') || channel

        try {
            const data = await reactionSchema.findOne({GuildID: guildId});

            if (!data) {
                return await interaction.reply({content: 'This server doesn\'t have any reaction roles', ephemeral: true})
            }

            const panelEmbed = new EmbedBuilder()
                .setDescription('Select your roles below using the panel.')
                .setColor("DarkButNotBlack")
                .setAuthor({name: "AMG", iconURL: icon})
                .setTimestamp()

            const options = data.Roles.map(x => {
                const role = guild.roles.cache.get(x.roleId);

                return {
                    label: role.name,
                    value: role.id,
                    description: x.roleDescription,
                    emoji: x.roleEmoji || undefined
                };
            });

            const menuComponents = [
                new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('reaction-roles')
                        .setMaxValues(options.length)
                        .addOptions(options),
                ),
            ];

            await panelChannel.send({embeds: [panelEmbed], components: menuComponents})

            return interaction.reply({content: `Panel sent to ${panelChannel}!`, ephemeral: true})
        } catch (error) {
            console.log(error)
        }
    }
}
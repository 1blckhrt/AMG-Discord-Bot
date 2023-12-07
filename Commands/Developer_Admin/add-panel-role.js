const reactionSchema = require('../../Schemas/reaction-role');
const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-panel-role')
        .setDescription('Add reaction roles to the panel.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)
        .addRoleOption(option =>
            option.setName('role')
            .setDescription('The role you want to add.')
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('emoji')
            .setDescription('The emoji you want to assign to the role.')
            .setRequired(false)
        ),

    async execute(interaction, client) {
        if (!interaction.user.id === "800222752572702731" || !interaction.user.id === "854483188255686656" || !interaction.user.id === "808802276516954133") await interaction.reply({content: "You don't have permission to use this system!", ephemeral: true});
        const icon = `${client.user.displayAvatarURL()}`;
        const {options, guildId, member} = interaction;

        const role = options.getRole('role');
        const description = options.getString('description');
        const emoji = options.getString('emoji');

        try {
            
            if (role.position >= member.roles.highest.position)
            return interaction.reply({content: 'Your role is too low!', ephemeral: true})

            const data = await reactionSchema.findOne({GuildID: guildId});

            const newRole = {
                roleId: role.id,
                roleDescription: description || 'No description',
                roleEmoji: emoji || "",
            }

            if (data) {
                let roleData = data.Roles.find((x) => x.roleId === role.id);

                if (roleData) {
                    roleData = newRole;
                } else {
                    data.Roles = [...data.Roles, newRole]
                }

                await data.save()
            } else {
                await reactionSchema.create({
                    GuildID: guildId,
                    Roles: newRole,
                });
            }

            return await interaction.reply({content: `Created new role: **${role.name}**`, ephemeral: true});

        } catch (error) {
            console.log(error)
        }
    }
}
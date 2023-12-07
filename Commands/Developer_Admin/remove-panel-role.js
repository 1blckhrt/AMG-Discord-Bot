const reactionSchema = require('../../Schemas/reaction-role');
const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove-panel-role')
        .setDescription('Remove reaction roles from the panel.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)
        .addRoleOption(option =>
            option.setName('role')
            .setDescription('The role you want to remove.')
            .setRequired(true)
        ),

    async execute(interaction) {
        const {options, guildId, member} = interaction;

        const role = options.getRole('role');

        try {
        
            const data = await reactionSchema.findOne({GuildID: guildId});

           if (!data)
                return await interaction.reply({content: `This server doesnt have any reaction roles!`, ephemeral: true})

            const roles = data.Roles;
            const findRole = roles.find((r) => r.roleId === role.id);

            if (!findRole)
                return await interaction.reply({content: `This role doesn't exist!`, ephemeral: true})

            const filteredRoles = roles.filter((r) => r.roleId !== role.id);
            data.Roles = filteredRoles;

            await data.save()
           

            return await interaction.reply({content: `Deleted role: **${role.name}**`, ephemeral: true});

        } catch (error) {
            console.log(error)
        }
    }
}
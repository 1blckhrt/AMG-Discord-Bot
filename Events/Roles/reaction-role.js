const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    once: false,

    async execute(interaction) {
        const {customId, values, guild, member } = interaction;
        if (interaction.isStringSelectMenu()) {
            if (customId === 'reaction-roles') {
              const rolesToRemove = [];
      
              for (let i = 0; i < values.length; i++) {
                const roleId = values[i];
      
                const role = guild.roles.cache.get(roleId);
                const hasRole = member.roles.cache.has(roleId);
      
                if (hasRole) {
                  member.roles.remove(roleId);
                } else {
                  member.roles.add(roleId);
                }
      
                rolesToRemove.push(roleId);
              }
      
              const menuComponent = interaction.message.components[0].components[0];
              const updatedOptions = menuComponent.options.filter(
                (option) => !rolesToRemove.includes(option.value)
              );
      
              menuComponent.options = updatedOptions;
      
              await interaction.update({ components: [interaction.message.components[0]] });
      
              try {
                await interaction.followUp({ content: "Roles updated!", ephemeral: true });
              } catch (error) {
                console.error("Error replying to interaction:", error);
              }
    }
}}}
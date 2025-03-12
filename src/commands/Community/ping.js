const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('this is the ping command'),
    async execute (interaction) {
        interaction.reply({ content: 'pong!' });
    }
}
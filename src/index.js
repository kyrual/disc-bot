const { Client, GatewayIntentBits, Collection } = require('discord.js');

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent
    ]})

client.commands = new Collection()
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const functions = fs.readdirSync(path.join(__dirname, "functions")).filter(file => file.endsWith(".js"));
const commandFldrs = fs.readdirSync(path.join(__dirname, "commands"));

(async () => {
    for (const file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleCommands(commandFldrs, "./src/commands");
    client.login(process.env.token);
})();

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;
    try{
        await command.execute(interaction, client);
    } catch (error) {
        console.log(error);
        await interaction.reply({
            content: 'There was an error executing cmd',
            ephemeral: true
        })
    }
})
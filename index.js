const fs = require('fs');
const Client = require('./client/client');
const Discord = require('discord.js');
const embed = new Discord.RichEmbed().setColor(0xFF0000);
const {
  prefix,
  token,
} = require('./config.json');

const client = new Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log('Ready!');
});

client.once('reconnecting', () => {
  console.log('Reconnecting!');
});

client.once('disconnect', () => {
  console.log('Disconnect!');
});

client.on('message', async message => {
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

    //const command = client.commands.get(commandName);

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  
  if (!client.commands.has(commandName)) return message.channel.send(embed.setTitle('Prefixo Errado').setDescription('Ta digitando oque sabe em!').setTimestamp());
  
  try {
		client.commands.get(commandName).execute(message);
 
  } catch (error) {
    console.error(error);
    message.reply(embed.setTitle('Erro').setDescription('Erro ao digitar um comando!').setTimestamp());;
  }
});

client.login(token);
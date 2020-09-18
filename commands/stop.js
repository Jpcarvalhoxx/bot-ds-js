const Discord = require('discord.js');
const embed = new Discord.RichEmbed();

module.exports = {
	name: 'stop',
	description: 'para o bot!',
	execute(message) {
		embed.setColor(0xFF0000);
		const serverQueue = message.client.queue.get(message.guild.id);
        if (!message.member.voiceChannel) return message.channel.send(embed.setTitle('Permissão!').setDescription('Você precisa estar em um canal de voz para usar um comando!').setTimestamp());
	    if (!serverQueue) return message.channel.send(embed.setTitle('You cego!').setDescription('Já fui de beise já doente...').setTimestamp());
		serverQueue.songs = [];
		message.channel.send(embed.setTitle('Feels Bad!').setColor('#00FF00').setDescription('DJ Juninho foi de baise...').setTimestamp());
	    serverQueue.connection.dispatcher.end();
		 serverQueue.voiceChannel.leave();
		
		
	},
};
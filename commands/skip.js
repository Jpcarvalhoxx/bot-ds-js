const Discord = require('discord.js');
const embed = new Discord.RichEmbed();

module.exports = {
	name: 'skip',
	description: 'pular a música!',
	execute(message) {
		embed.setColor(0xFF0000);
		const serverQueue = message.client.queue.get(message.guild.id);
			if (!message.member.voiceChannel) return message.channel.send(embed.setTitle('Permissão!').setDescription('Você precisa estar em um canal de voz para usar um comando!').setTimestamp());
			if (!serverQueue) return message.channel.send(embed.setTitle('You cego!').setDescription('Não há música que eu possa pular!').setTimestamp());
			
			message.channel.send(embed.setTitle('Sucesso!').setColor('#00FF00').setDescription(`${serverQueue.songs[0].title} foi pulada XD!`).setTimestamp());		
			try{
			serverQueue.connection.dispatcher.end();
			}catch(error){
            
			}	
			
	},
};
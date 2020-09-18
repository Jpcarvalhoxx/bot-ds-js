const Discord = require('discord.js');
const embed = new Discord.RichEmbed();

module.exports = {
	name: 'resume',
	description: 'tirar o pause!',
	execute(message) {
	embed.setColor(0xFF0000);	
		const serverQueue = message.client.queue.get(message.guild.id);
		 if (!message.member.voiceChannel) return message.channel.send(embed.setTitle('Permissão!').setDescription('Você precisa estar em um canal de voz para usar um comando!').setTimestamp());
	     if (!serverQueue) return message.channel.send(embed.setTitle('You cego!').setDescription('Não há música que eu pra dar resume!').setTimestamp());
	     if(message.member.voiceChannel.connection.dispatcher.paused){
	            message.channel.send(embed.setTitle('Sucesso!').setColor('#00FF00').setDescription(`${serverQueue.songs[0].title} resume!`).setTimestamp())
	            serverQueue.connection.dispatcher.resume();
       		}else{
				message.channel.send(embed.setTitle('Só o Resume!').setDescription('Ta resumando oq resume em xD').setTimestamp());
			}
		
		
	},
};
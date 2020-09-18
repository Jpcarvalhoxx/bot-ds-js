const Discord = require('discord.js');
const embed = new Discord.RichEmbed();

module.exports = {
	name: 'pause',
	description: 'pausar musicas!',
	execute(message) {	
	embed.setColor(0xFF0000);	
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!message.member.voiceChannel) return message.channel.send(embed.setTitle('Permissão!').setDescription('Você precisa estar em um canal de voz para usar um comando!').setTimestamp());
	    if (!serverQueue) return message.channel.send(embed.setTitle('You cego!').setDescription('Não tem música pra pausar!').setTimestamp());
	    if(!message.member.voiceChannel.connection.dispatcher.paused){
            message.channel.send(embed.setTitle('Sucesso!').setColor('#00FF00').setDescription(`${serverQueue.songs[0].title} foi pausada!`).setTimestamp());
	        serverQueue.connection.dispatcher.pause();
           }else{
	             message.channel.send(embed.setTitle('Deu ruim!').setDescription('NA pause em xD!').setTimestamp());
                }		
	},
};
const Discord = require('discord.js');
const embed = new Discord.RichEmbed();

module.exports = {
    name: 'help',
    description: 'mostrar comandos',
    execute(message) {
        embed.setColor(0xFF0000);
       
        if (!message.member.voiceChannel) return message.channel.send(embed.setTitle('Permissão!').setDescription('Você precisa estar em um canal de voz para usar um comando!').setTimestamp());
        
        message.channel.send(embed.setTitle('Lista de Comandos')
            .setDescription('Abaixo estão todos os comando')
            .addField('Play','Comando responsável por tocar as músicas (Digite: !play + link/nome da música)): ', true)
            .addField('Img','Comando responsável por pesquisar imagens internet (Digite: !img + nome desejado)')
            .addField('Pause','Comando responsável por pausar músicas (Digite: !pause)')
            .addField('Resume', 'Comando responsável por despausar músicas (Digite: !resume)')
            .addField('Skip', 'Comando responsável por pular músicas (Digite: !skip)')
            .addField('Stop', 'Comando responsável por parar o bot completamente (Digite: !stop)')
            .setThumbnail('https://pbs.twimg.com/profile_images/2767740364/3397e4e9ee5da5f72641a156da009770.png')
            .setTimestamp());

    },
};
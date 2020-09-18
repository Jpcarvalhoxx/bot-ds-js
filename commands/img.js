
const request = require('request');
const cheerio = require('cheerio');
const Discord = require('discord.js');
const ferramenta = require('../ferramenta/ferramenta');
const embed = new Discord.RichEmbed();

module.exports = {
	name: 'img',
	description: 'pesquisa de imagens!',
	execute(message) {
		embed.setColor(0xFF0000);
		console.log('Tamo ak XD');
		
		const serverQueue = message.client.queue.get(message.guild.id);
		//if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
    try{  
	    if (!message.member.voiceChannel) return message.channel.send(embed.setTitle('Permissão!').setDescription('Você precisa estar em um canal de voz para um comando!').setTimestamp());
        if(message.content.length < 5) return  message.channel.send(embed.setTitle('You cego!').setDescription('Você digitou errado!').setTimestamp());
	
		let pesquisaImg = message.content;
		 pesquisaImg = ferramenta.limparEspacamentos(pesquisaImg);
	
	
       console.log(pesquisaImg);

    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + pesquisaImg,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };
    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
        $ = cheerio.load(responseBody);
 
        var links = $(".image a.link");
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href")); 
        console.log(urls);
 
        if (!urls.length) {     
            return;
        }
        // Send result
       const urlAleatoria = urls[Math.floor(Math.random() * urls.length)];
        message.channel.send(embed.setTitle(pesquisaImg).setColor('#00FF00').setDescription(urls[Math.floor(Math.random() * urls.length)]+'').setTimestamp().setImage(urlAleatoria));
    });
}catch(error){
	console.log(error);
	message.channel.send(embed.setTitle('Azedou!').setDescription('Deu alguma merda...').setTimestamp());
	return;
   }
	},
};
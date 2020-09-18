
const { Util, RichEmbed } = require('discord.js');
const ferramenta = require('../ferramenta/ferramenta');
const ytdl = require("ytdl-core");
const YouTube = require("discord-youtube-api");
const youtube = new YouTube("AIzaSyDk8q8AbO18ldW4jxhEsV3Eghpd9r7bd7w");
const embed = new RichEmbed();


//lembrar de mexer nesse arquivo
module.exports = {
  name: "play",
  description: "tocar musica!",
  async execute(message) {
    embed.setColor(0xFF0000);
    try {
      const queue = message.client.queue;
      const serverQueue = message.client.queue.get(message.guild.id);
      const voiceChannel = message.member.voiceChannel;


      if (!voiceChannel) return message.channel.send(embed.setTitle('Permissão!').setDescription('Você precisa estar em um canal de voz para um comando!').setTimestamp());
      const permissions = voiceChannel.permissionsFor(message.client.user);
      if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
        return message.channel.send(embed.setTitle('Permissão!').setDescription('Eu preciso das permissões para participar e falar no seu canal de voz!').setTimestamp());
      }
      if (message.content.length < 5) return message.channel.send(embed.setTitle('Erro!').setDescription('Você digitou errado 4head').setTimestamp());

      let args = message.content;

      args = ferramenta.limparEspacamentos(args);

      console.log(args)


      let songInfo = [];
      try {

        songInfo = await youtube.getPlaylist(args);
      } catch (error) {
        try {
          songInfo.push(await youtube.getVideo(args));
        } catch (error) {
          try {
            songInfo.push(await youtube.searchVideos(args));
          } catch (error) {
            message.channel.send(embed.setTitle('Disney!').setDescription('Se ta digitando muita merda em, pqp xD...').setTimestamp());
            return;
          }
        }
      }
   
      songInfo = ferramenta.limparLicensedContent(songInfo)   

      if (songInfo.length == 0) {
        message.channel.send(embed.setTitle('Disney!').setDescription('Houve um problema com o vídeo,..').setTimestamp());
        return;
      }


      if (!serverQueue) {
        const queueContruct = {
          textChannel: message.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [],
          volume: 5,
          playing: true,
        };

        queue.set(message.guild.id, queueContruct);

        queueContruct.songs = songInfo;

        try {

          var connection = await voiceChannel.join();
          queueContruct.connection = connection;
          this.play(message, queueContruct.songs[0]);

        } catch (err) {

          console.log(err);
          queue.delete(message.guild.id);
          return message.channel.send(err);

        }
      } else {

        songInfo = ferramenta.limparLicensedContent(songInfo)
        for (let i = 0; i < songInfo.length; i++) {
          serverQueue.songs.push(songInfo[i]);
        }

        if (songInfo.length > 1) {
          message.channel.send(embed.setTitle('Sucesso!').setColor('#00FF00').setDescription('sua playlist foi add a fila...').setTimestamp());
        } else {
          message.channel.send(embed.setTitle('Sucesso!').setColor('#00FF00').setDescription(`${songInfo[0].title} foi add a fila...`).setTimestamp());
        }

        return;
      }
    } catch (error) {
      console.log(error);

      message.channel.send(error.message);


    }
  },
  play(messege, song) {

    const queue = messege.client.queue;
    const serverQueue = queue.get(messege.guild.id);
    if (!song) {
      // console.log("Chego")
      serverQueue.voiceChannel.leave();
      queue.delete(messege.guild.id);
      return;
    }

    try {
      const dispatcher = serverQueue.connection.playStream(ytdl(song.url))

        .on('end', () => {
          if (serverQueue.songs.length > 0) {
            serverQueue.songs.shift();
          }
          console.log('Chego ak')
          this.play(messege, serverQueue.songs[0]);
        })
        .on('error', error => {
          console.error(error);
        });
      dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
      messege.channel.send(embed.setTitle('Tocando!').setColor('#00FF00').setDescription(`${song.title} começou a tocar!`).setTimestamp());
    } catch (error) {

    }
  }


};
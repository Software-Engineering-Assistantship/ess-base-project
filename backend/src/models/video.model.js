const VideoEntity = require('../entities/video.entity');

class VideoModel {
  constructor(video) {
    this.videoId = video.videoId;
    this.titulo = video.titulo;
    this.duracao = video.duracao;
    this.views = video.views;
    this.videoLink = video.videoLink;
  }
}

module.exports = VideoModel;

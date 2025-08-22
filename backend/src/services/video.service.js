const VideoRepository = require('../repositories/video.repository');
const { HttpNotFoundError } = require('../utils/errors/http.error');
const VideoEntity = require('../entities/video.entity');

class VideoService {
  constructor(videoRepository) {
    this.videoRepository = videoRepository;
  }

  async getVideo(videoId) {
    const video = await this.videoRepository.getVideoByVideoId(videoId);
    if (!video) {
      throw new HttpNotFoundError({ msg: 'Vídeo não encontrado', msgCode: 'video_not_found' });
    }
    return new VideoEntity(video);
  }

  async registerView(videoId, userId) {
    const video = await this.videoRepository.getVideoByVideoId(videoId);
    if (!video) {
      throw new HttpNotFoundError({ msg: 'Vídeo não encontrado', msgCode: 'video_not_found' });
    }
    await this.videoRepository.updateById(video.id, { views: video.views + 1 });
    return {
      code: 201,
      data: { message: 'Visualização registrada com sucesso', videoId: video.videoId, userId },
    };
  }
}

module.exports = VideoService;

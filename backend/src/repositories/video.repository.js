const BaseRepository = require('./base.repository');
const { HttpInternalServerError } = require('../utils/errors/http.error');

class VideoRepository extends BaseRepository {
  constructor() {
    super('videos');
  }

  async init() {
    await super.init();
  }

  async getVideoByVideoId(videoId) {
    try {
      const sql = `SELECT * FROM videos WHERE videoId = ?`;
      const row = await this.db.get(sql, [videoId]);
      return row;
    } catch (e) {
      throw new HttpInternalServerError({ msg: 'Erro ao buscar vídeo' });
    }
  }
}

module.exports = VideoRepository;

const BaseRepository = require('./base.repository');
const { HttpInternalServerError } = require('../utils/errors/http.error');

class HistoryRepository extends BaseRepository {
  constructor() {
    super('histories');
  }

  async init() {
    await super.init();
  }

  async getHistoryByUserId(userId) {
    try {
      const sql = `SELECT * FROM histories WHERE userId = ?`;
      const rows = await this.db.all(sql, [userId]);
      return rows;
    } catch (e) {
      throw new HttpInternalServerError({ msg: 'Erro ao buscar histórico' });
    }
  }

  async getHistoryItem(userId, videoId) {
    try {
      const sql = `SELECT * FROM histories WHERE userId = ? AND videoId = ?`;
      const row = await this.db.get(sql, [userId, videoId]);
      return row;
    } catch (e) {
      throw new HttpInternalServerError({ msg: 'Erro ao buscar item de histórico' });
    }
  }
}

module.exports = HistoryRepository;

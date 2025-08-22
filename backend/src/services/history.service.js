const HistoryItemEntity = require('../entities/history.item.entity');
const { HttpNotFoundError } = require('../utils/errors/http.error');

class HistoryService {
  constructor(historyRepository) {
    this.historyRepository = historyRepository;
    this.validUsers = new Set(['1', '2', '3']);
  }

  async getHistory(userId) {
    if (!this.validUsers.has(userId)) {
      throw new HttpNotFoundError({ msg: 'Usuário não encontrado', msgCode: 'user_not_found' });
    }
    const history = await this.historyRepository.getHistoryByUserId(userId);
    return { code: 200, data: history };
  }

  async addOrUpdateHistory(userId, videoData) {
    if (!this.validUsers.has(userId)) {
      throw new HttpNotFoundError({ msg: 'Usuário não encontrado', msgCode: 'user_not_found' });
    }
    const now = new Date().toISOString();
    const existing = await this.historyRepository.getHistoryItem(userId, videoData.videoId);
    let msg, code;
    if (existing) {
      await this.historyRepository.updateById(existing.id, { ultimaVisualizacao: now });
      msg = 'Data de visualização atualizada';
      code = 200;
    } else {
      const newItem = new HistoryItemEntity({
        userId,
        videoId: videoData.videoId,
        ultimaVisualizacao: now,
      });
      await this.historyRepository.add(newItem);
      msg = 'Vídeo adicionado ao histórico';
      code = 201;
    }
    const history = await this.historyRepository.getHistoryByUserId(userId);
    return { code, msg, data: history };
  }
}

module.exports = HistoryService;

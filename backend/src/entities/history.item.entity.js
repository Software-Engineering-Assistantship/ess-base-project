const BaseEntity = require('./base.entity');

class HistoryItemEntity extends BaseEntity {
  constructor({ userId, videoId, ultimaVisualizacao }) {
    super();
    this.userId = userId;
    this.videoId = videoId;
    this.ultimaVisualizacao = ultimaVisualizacao;
  }
}

module.exports = HistoryItemEntity;

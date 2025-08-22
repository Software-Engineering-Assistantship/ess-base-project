const HistoryItemEntity = require('../entities/history.item.entity');

class HistoryModel {
  constructor(item) {
    this.videoId = item.videoId;
    this.ultimaVisualizacao = item.ultimaVisualizacao;
  }
}

module.exports = HistoryModel;

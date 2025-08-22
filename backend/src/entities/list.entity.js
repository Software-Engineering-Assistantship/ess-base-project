const BaseEntity = require('./base.entity');

class ListEntity extends BaseEntity {
  constructor({ videoIds, titulo, id, userId }) {
    super();
	this.id = id;
	this.userId = userId;
    this.videoIds = videoIds;
    this.titulo = titulo;
  }
}

module.exports = ListEntity;

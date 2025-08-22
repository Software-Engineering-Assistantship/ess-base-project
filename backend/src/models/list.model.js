const ListItemEntity = require('../entities/list.item.entity');

class ListModel {
  constructor(lista) {
    this.id = lista.id;
	this.userId = lista.userId;
    this.videoIds = lista.videoIds;
    this.titulo = lista.titulo;
  }
}

module.exports = ListModel;

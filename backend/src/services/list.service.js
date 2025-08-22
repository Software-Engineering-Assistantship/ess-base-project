const { HttpBadRequestError, HttpNotFoundError } = require('../utils/errors/http.error');
const ListEntity = require('../entities/list.entity');
const DatabaseUtils = require('../utils/database');

class ListService {
  constructor(listRepository) {
    this.listRepository = listRepository;
  }

  async addList(titulo, userId) {
	if (!titulo || !userId) {
	  throw new HttpBadRequestError('Título e userId são obrigatórios');
	}

	const listData = {
		id: DatabaseUtils.generateUUID(),
		videoIds: JSON.stringify([]),
		titulo,
		userId
	}

	const list = new ListEntity(listData);
	return await this.listRepository.addList(list);
  }

  async addVideoToList(videoId, id) {
	if (!videoId || !id) {
	  throw new HttpBadRequestError('videoId e id são obrigatórios');
	}

	const list = await this.listRepository.getListById(id);

	if (!list) {
	  throw new HttpBadRequestError('Lista não encontrada');
	}

	const videoIds = JSON.parse(list.videoIds);

	if (videoIds.includes(videoId)) {
	  throw new HttpBadRequestError('Vídeo já está na lista');
	}

	videoIds.push(videoId);

	const updatedList = {
	  ...list,
	  videoIds: JSON.stringify(videoIds),
	}

	return await this.listRepository.updateList(updatedList);
  }
  async removeVideoFromList(videoId, id) {
	if (!videoId || !id) {
	  throw new HttpBadRequestError('videoId e id são obrigatórios');
	}

	const list = await this.listRepository.getListById(id);

	if (!list) {
	  throw new HttpNotFoundError('Lista não encontrada');
    }

	const videoIds = JSON.parse(list.videoIds);

	if (!videoIds.includes(videoId)) {
	  throw new HttpNotFoundError('Vídeo não encontrado na lista');
  	}
	videoIds.pop(videoId);
	const updatedList = {
	  ...list,
	  videoIds: JSON.stringify(videoIds),
	}
	return await this.listRepository.updateList(updatedList);
  }
  
  async deleteList(id) {
	if (!id) {
	  throw new HttpBadRequestError('id é obrigatório');
	}

	const list = await this.listRepository.getListById(id);

	if (!list) {
	  throw new HttpNotFoundError('Lista não encontrada');
	}

	return await this.listRepository.deleteList(id);
  }
}

module.exports = ListService;

const BaseRepository = require('./base.repository');
const { HttpInternalServerError } = require('../utils/errors/http.error');

class ListRepository extends BaseRepository {
  constructor() {
    super('lists');
  }

  async init() {
    await super.init();
  }

  async addList(list) {
	try {
	  const sql = `INSERT INTO lists (titulo, videoIds, userId, id) VALUES (?, ?, ?, ?)`;
	  const result = await this.db.run(sql, [list.titulo, list.videoIds, list.userId, list.id]);
	  return result;
	} catch (e) {
	  throw new HttpInternalServerError({ msg: 'Erro ao adicionar lista' });
	}
  }

  async getListById(id) {
	try {
	  const sql = `SELECT * FROM lists WHERE id = ?`;
	  const result = await this.db.get(sql, [id]);
	  return result;
	} catch (e) {
		throw new HttpInternalServerError({ msg: 'Erro ao buscar lista' });
	}
  }

  async updateList(list) {
	try {
	  const sql = `UPDATE lists SET titulo = ?, videoIds = ?, userId = ? WHERE id = ?`;
	  const result = await this.db.run(sql, [list.titulo, list.videoIds, list.userId, list.id]);
	  return result;
	} catch (e) {
		throw new HttpInternalServerError({ msg: 'Erro ao atualizar lista' });
	}
  }

  async deleteList(id) {
	try {
	  const sql = `DELETE FROM lists WHERE id = ?`;
	  const result = await this.db.run(sql, [id]);
	  return result;
	} catch (e) {
		throw new HttpInternalServerError({ msg: 'Erro ao deletar lista' });
	}
  }
}

module.exports = ListRepository;

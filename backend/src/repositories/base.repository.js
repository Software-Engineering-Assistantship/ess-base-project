const Database = require('../database');
const { v4: uuidv4 } = require('uuid');
const { HttpInternalServerError } = require('../utils/errors/http.error');

class BaseRepository {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async init() {
    const database = await Database.getInstance();
    this.db = database.db;
  }

  async add(data) {
    try {
      const newId = uuidv4();
      data.id = newId;
      const keys = Object.keys(data);
      const placeholders = keys.map(() => '?').join(', ');
      const values = keys.map(key => data[key]);
      const sql = `INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${placeholders})`;
      await this.db.run(sql, values);
      return data;
    } catch (e) {
      throw new HttpInternalServerError({ msg: 'Erro ao adicionar registro' });
    }
  }

  async updateById(id, data) {
    try {
      const keys = Object.keys(data);
      if (keys.length === 0) return null;
      const setClause = keys.map(key => `${key} = ?`).join(', ');
      const values = keys.map(key => data[key]);
      values.push(id);
      const sql = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`;
      await this.db.run(sql, values);
      const row = await this.db.get(`SELECT * FROM ${this.tableName} WHERE id = ?`, id);
      return row;
    } catch (e) {
      throw new HttpInternalServerError({ msg: 'Erro ao atualizar registro' });
    }
  }

  async findOne(query, params) {
    try {
      const row = await this.db.get(query, params);
      return row;
    } catch (e) {
      throw new HttpInternalServerError({ msg: 'Erro ao buscar registro' });
    }
  }

  async findAll(query, params = []) {
    try {
      const rows = await this.db.all(query, params);
      return rows;
    } catch (e) {
      throw new HttpInternalServerError({ msg: 'Erro ao buscar registros' });
    }
  }
}

module.exports = BaseRepository;

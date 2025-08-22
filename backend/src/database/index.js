const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

class Database {
  static async getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
      await Database.instance._init();
    }
    return Database.instance;
  }

  async _init() {
    const dbPath = process.env.ENV === 'TEST'
      ? ':memory:'
      : path.resolve(process.cwd(), 'database.sqlite');
    this.db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    await this.db.exec('PRAGMA foreign_keys = ON;');
    await this.initialize();
  }

  async initialize() {
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        nome TEXT
      );
      CREATE TABLE IF NOT EXISTS videos (
        id TEXT PRIMARY KEY,
        videoId TEXT,
        titulo TEXT,
        duracao TEXT,
        views INTEGER,
        likes INTEGER,
        videoLink TEXT
      );
      CREATE TABLE IF NOT EXISTS histories (
        id TEXT PRIMARY KEY,
        userId TEXT,
        videoId TEXT,
        ultimaVisualizacao TEXT,
        FOREIGN KEY(userId) REFERENCES users(id)
      );
      CREATE TABLE IF NOT EXISTS lists (
        id TEXT PRIMARY KEY,
        userId TEXT,
        videoIds TEXT,
        titulo TEXT
      );
    `);
  }

  static async reset() {
    const instance = await Database.getInstance();
    await instance.db.exec(`
      DROP TABLE IF EXISTS videos;
      DROP TABLE IF EXISTS histories;
      DROP TABLE IF EXISTS users;
    `);
    await instance.initialize();
  }

  async seed() {
    await this.db.exec(`
      INSERT OR IGNORE INTO users (id, nome) VALUES 
      ('1', 'User 1'),
      ('2', 'User 2'),
      ('3', 'User 3');
    `);
    await this.db.exec(`
      INSERT OR IGNORE INTO videos (id, videoId, titulo, duracao, views, likes, videoLink) VALUES
      ('${Date.now()}-101', '101', 'Stranger Things - Piloto', '45 minutos', 0, 0, 'https://youtube.com/watch?v=101'),
      ('${Date.now()}-102', '102', 'Breaking Bad - Piloto', '60 minutos', 0, 0, 'https://youtube.com/watch?v=102');
    `);
    const now = new Date().toISOString();
    await this.db.exec(`
      INSERT OR IGNORE INTO histories (id, userId, videoId, ultimaVisualizacao) VALUES
      ('${Date.now()}-h1', '1', '101', '${now}'),
      ('${Date.now()}-h2', '1', '102', '${now}');
    `);
  }
}

module.exports = Database;

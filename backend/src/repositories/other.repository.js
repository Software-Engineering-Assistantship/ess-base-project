const BaseRepository = require('./base.repository');
const TestEntity = require('../entities/test.entity');

class OtherRepository extends BaseRepository {
  constructor() {
    super('tests');
  }

  async getTests() {
    return await this.findAll();
  }
}

module.exports = OtherRepository;






// import TestEntity from '../entities/test.entity';
// import BaseRepository from './base.repository';

// class OtherRepository extends BaseRepository<TestEntity> {
//   constructor() {
//     super('tests');
//   }

//   public async getTests(): Promise<TestEntity[]> {
//     return await this.findAll();
//   }
// }

// export default OtherRepository;

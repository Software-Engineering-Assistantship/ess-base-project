const BaseModel = require('./base.model');

class TestModel extends BaseModel {
  constructor(data) {
    super(data.id || '');
    this.name = data.name;
  }
}

module.exports = TestModel;





// import BaseModel from './base.model';

// export default class TestModel extends BaseModel {
//   name: string;

//   constructor(data: TestModel) {
//     super(data.id || '');
//     this.name = data.name;
//   }
// }

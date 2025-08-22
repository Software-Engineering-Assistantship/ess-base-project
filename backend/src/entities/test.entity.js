const BaseEntity = require('./base.entity');

class TestEntity extends BaseEntity {
  constructor(data) {
    super(data.id || '');
    this.name = data.name;
  }
}

module.exports = TestEntity;

import BaseEntity from './base.entity';

export default class TestEntity extends BaseEntity {
  name: string;

  constructor(data: TestEntity) {
    super(data.id || '');
    this.name = data.name;
  }
}

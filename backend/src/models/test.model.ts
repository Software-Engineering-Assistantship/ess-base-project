import BaseModel from './base.model';

export default class TestModel extends BaseModel {
  name: string;

  constructor(data: TestModel) {
    super(data.id || '');
    this.name = data.name;
  }
}

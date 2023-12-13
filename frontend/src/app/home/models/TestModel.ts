export default class TestModel {
  id: string;
  name: string;

  constructor(data: TestModel) {
    this.id = data.id;
    this.name = data.name;
  }
}

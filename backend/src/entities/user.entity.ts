import BaseEntity from './base.entity';

export default class UserEntity extends BaseEntity {
  email: string;
  password: string;

  constructor(data: UserEntity) {
    super(data.id || '');
    this.email = data.email;
    this.password = data.password;
  }
}

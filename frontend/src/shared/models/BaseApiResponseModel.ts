export default class BaseApiResponseModel {
  msg: string;
  msgCode: string;

  code: number;

  data?: any;

  constructor(data: BaseApiResponseModel) {
    this.msg = data.msg;
    this.msgCode = data.msgCode;
    this.code = data.code;
    this.data = data.data;
  }
}

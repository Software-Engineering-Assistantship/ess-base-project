class Result {
  constructor({ msg, msgCode, code }) {
    this.msg = msg;
    this.msgCode = msgCode;
    this.code = code;
  }

  static transformRequestOnMsg(req) {
    return `${req.method} ${req.originalUrl}`;
  }
}

class SuccessResult extends Result {
  constructor({ msg, msgCode, code, data }) {
<<<<<<< HEAD
    super({
      msg,
      msgCode: msgCode || 'success',
      code: code || 200,
    });
=======
    super({ msg, msgCode: msgCode || 'success', code: code || 200 });
>>>>>>> main
    this.data = data;
  }

  handle(res) {
<<<<<<< HEAD
    return res.status(this.code).send(this);
  }
}

class FailureResult extends Result {
  constructor({ msg, msgCode, code }) {
    super({
      msg,
      msgCode: msgCode || 'failure',
      code: code || 500,
    });
=======
    return res.status(this.code).json({
      msg: this.msg,
      msgCode: this.msgCode,
      code: this.code,
      data: this.data,
    });
  }  
}


class FailureResult extends Result {
  constructor({ msg, msgCode, code }) {
    super({ msg, msgCode: msgCode || 'failure', code: code || 500 });
>>>>>>> main
  }

  handle(res) {
    return res.status(this.code).send(this);
  }
}

<<<<<<< HEAD
module.exports = { SuccessResult, FailureResult };



// import { Request, Response } from 'express';

// export abstract class Result {
//   msg: string;
//   msgCode: any;
//   code: number;

//   constructor({
//     msg,
//     msgCode,
//     code,
//   }: {
//     msg: string;
//     msgCode: any;
//     code: number;
//   }) {
//     this.msg = msg;
//     this.msgCode = msgCode;
//     this.code = code;
//   }

//   static transformRequestOnMsg(req: Request) {
//     return `${req.method} ${req?.originalUrl}`;
//   }
// }

// export class SuccessResult extends Result {
//   data?: any;

//   constructor({
//     msg,
//     msgCode,
//     code,
//     data,
//   }: {
//     msg: string;
//     msgCode?: any;
//     code?: number;
//     data?: any;
//   }) {
//     super({ msg, msgCode: msgCode || 'success', code: code || 200 });
//     this.data = data;
//   }

//   handle(res: Response) {
//     return res.status(this.code).send(this);
//   }
// }

// export class FailureResult extends Result {
//   constructor({
//     msg,
//     msgCode,
//     code,
//   }: {
//     msg: string;
//     msgCode?: any;
//     code?: number;
//   }) {
//     super({ msg, msgCode: msgCode || 'failure', code: code || 500 });
//   }

//   handle(res: Response) {
//     return res.status(this.code).send(this);
//   }
// }
=======
module.exports = { Result, SuccessResult, FailureResult };
>>>>>>> main

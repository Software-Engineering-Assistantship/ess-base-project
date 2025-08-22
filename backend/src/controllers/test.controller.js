const { Router } = require('express');
const { Result, SuccessResult } = require('../utils/result');
const TestService = require('../services/test.service');
const TestEntity = require('../entities/test.entity');

class TestController {
  constructor(router, testService) {
    this.router = router;
    this.testService = testService;
    this.prefix = '/tests';
    this.initRoutes();
  }

  initRoutes() {
    this.router.get(this.prefix, (req, res) => this.getTests(req, res));
    this.router.get(`${this.prefix}/others`, (req, res) => this.getOthersTests(req, res));
    this.router.get(`${this.prefix}/:id`, (req, res) => this.getTest(req, res));
    this.router.post(this.prefix, (req, res) => this.createTest(req, res));
    this.router.put(`${this.prefix}/:id`, (req, res) => this.updateTest(req, res));
    this.router.delete(`${this.prefix}/:id`, (req, res) => this.deleteTest(req, res));
  }

  async getTests(req, res) {
    const tests = await this.testService.getTests();

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: tests,
    }).handle(res);
  }

  async getOthersTests(req, res) {
    const tests = await this.testService.getOtherTests();

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: tests,
    }).handle(res);
  }

  async getTest(req, res) {
    const test = await this.testService.getTest(req.params.id);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: test,
    }).handle(res);
  }

  async createTest(req, res) {
    const test = await this.testService.createTest(new TestEntity(req.body));

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: test,
    }).handle(res);
  }

  async updateTest(req, res) {
    const test = await this.testService.updateTest(req.params.id, new TestEntity(req.body));

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: test,
    }).handle(res);
  }

  async deleteTest(req, res) {
    await this.testService.deleteTest(req.params.id);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
    }).handle(res);
  }
}

module.exports = TestController;




// import { Router, Request, Response } from 'express';
// import { Result, SuccessResult } from '../utils/result';
// import TestService from '../services/test.service';
// import TestEntity from '../entities/test.entity';

// class TestController {
//   private prefix: string = '/tests';
//   public router: Router;
//   private testService: TestService;

//   constructor(router: Router, testService: TestService) {
//     this.router = router;
//     this.testService = testService;
//     this.initRoutes();
//   }

//   private initRoutes() {
//     this.router.get(this.prefix, (req: Request, res: Response) =>
//       this.getTests(req, res)
//     );

//     this.router.get(`${this.prefix}/others`, (req: Request, res: Response) =>
//       this.getOthersTests(req, res)
//     );

//     this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) =>
//       this.getTest(req, res)
//     );
//     this.router.post(this.prefix, (req: Request, res: Response) =>
//       this.createTest(req, res)
//     );
//     this.router.put(`${this.prefix}/:id`, (req: Request, res: Response) =>
//       this.updateTest(req, res)
//     );
//     this.router.delete(`${this.prefix}/:id`, (req: Request, res: Response) =>
//       this.deleteTest(req, res)
//     );
//   }

//   private async getTests(req: Request, res: Response) {
//     const tests = await this.testService.getTests();

//     return new SuccessResult({
//       msg: Result.transformRequestOnMsg(req),
//       data: tests,
//     }).handle(res);
//   }

//   private async getOthersTests(req: Request, res: Response) {
//     const tests = await this.testService.getOtherTests();

//     return new SuccessResult({
//       msg: Result.transformRequestOnMsg(req),
//       data: tests,
//     }).handle(res);
//   }

//   private async getTest(req: Request, res: Response) {
//     const test = await this.testService.getTest(req.params.id);

//     return new SuccessResult({
//       msg: Result.transformRequestOnMsg(req),
//       data: test,
//     }).handle(res);
//   }

//   private async createTest(req: Request, res: Response) {
//     const test = await this.testService.createTest(new TestEntity(req.body));

//     return new SuccessResult({
//       msg: Result.transformRequestOnMsg(req),
//       data: test,
//     }).handle(res);
//   }

//   private async updateTest(req: Request, res: Response) {
//     const test = await this.testService.updateTest(
//       req.params.id,
//       new TestEntity(req.body)
//     );

//     return new SuccessResult({
//       msg: Result.transformRequestOnMsg(req),
//       data: test,
//     }).handle(res);
//   }

//   private async deleteTest(req: Request, res: Response) {
//     await this.testService.deleteTest(req.params.id);

//     return new SuccessResult({
//       msg: Result.transformRequestOnMsg(req),
//     }).handle(res);
//   }
// }

// export default TestController;

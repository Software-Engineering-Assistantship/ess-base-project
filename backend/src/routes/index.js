<<<<<<< HEAD
const { Router } = require('express');
const { di } = require('../di');
const TestController = require('../controllers/test.controller');
const TestService = require('../services/test.service');

const router = Router();
const prefix = '/api';

module.exports = (app) => {
  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router
  );
};




// import { Express, Router } from 'express';
// import { di } from '../di';
// import TestController from '../controllers/test.controller';
// import TestService from '../services/test.service';

// const router = Router();
// const prefix = '/api';

// export default (app: Express) => {
//   app.use(
//     prefix,
//     new TestController(router, di.getService(TestService)).router
//   );
// };
=======
module.exports = (app) => {
  const historyRoutes = require('./history.routes');
  const videoRoutes = require('./video.routes');
  const listRoutes = require('./list.routes');

  app.use('/api', historyRoutes);
  app.use('/api', videoRoutes);
  app.use('/api', listRoutes);
};
>>>>>>> main

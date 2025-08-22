const { Router } = require('express');
const HistoryController = require('../controllers/history.controller');
const { di } = require('../di');
const HistoryService = require('../services/history.service');

const router = Router();
const historyService = di.getService(HistoryService);
new HistoryController(router, historyService);

module.exports = router;

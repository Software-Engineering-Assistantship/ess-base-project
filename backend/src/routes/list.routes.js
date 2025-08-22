const { Router } = require('express');
const ListController = require('../controllers/list.controller');
const { di } = require('../di');
const ListService = require('../services/list.service');

const router = Router();
const listService = di.getService(ListService);
new ListController(router, listService);

module.exports = router;

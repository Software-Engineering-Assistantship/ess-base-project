const { Router } = require('express');
const VideoController = require('../controllers/video.controller');
const { di } = require('../di');
const VideoService = require('../services/video.service');

const router = Router();
const videoService = di.getService(VideoService);
new VideoController(router, videoService);

module.exports = router;

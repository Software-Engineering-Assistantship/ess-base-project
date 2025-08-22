const { Router } = require('express');
const VideoService = require('../services/video.service');
const { SuccessResult } = require('../utils/result');

class VideoController {
  constructor(router, videoService) {
    this.router = router;
    this.videoService = videoService;
    this.prefix = '/videos';
    this.initRoutes();
  }

  initRoutes() {
    this.router.get(`${this.prefix}/:id`, this.getVideo.bind(this));
    this.router.post(`${this.prefix}/:id/visualizacao`, this.registerView.bind(this));
  }

  async getVideo(req, res) {
    try {
      const videoId = req.params.id;
      const video = await this.videoService.getVideo(videoId);
      new SuccessResult({
        msg: `${req.method} ${req.originalUrl}`,
        data: video, // usa o objeto retornado direto
        code: 200,   // código de sucesso
      }).handle(res);
    } catch (error) {
      res.status(error.status || 500).json({ msg: error.msg || error.message, msgCode: error.msgCode });
    }
  }

  async registerView(req, res) {
    try {
      const videoId = req.params.id;
      const { userId } = req.body;
      const result = await this.videoService.registerView(videoId, userId);
      new SuccessResult({
        msg: `${req.method} ${req.originalUrl}`,
        data: result.data,
        code: result.code,
      }).handle(res);
    } catch (error) {
      res.status(error.status || 500).json({ msg: error.msg || error.message, msgCode: error.msgCode });
    }
  }
}

module.exports = VideoController;

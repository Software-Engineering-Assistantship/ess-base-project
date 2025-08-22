const ListRepository = require('../repositories/list.repository');
const { SuccessResult } = require('../utils/result');

class ListController {
  constructor(router, listService) {
    this.router = router;
    this.listService = listService;
    this.prefix = '/listas';
    this.initRoutes();
  }

  initRoutes() {
    this.router.post(`${this.prefix}/`, this.addList.bind(this));
	this.router.post(`${this.prefix}/:id/video`, this.addVideoToList.bind(this));
	this.router.delete(`${this.prefix}/:id`, this.deleteList.bind(this));
	this.router.delete(`${this.prefix}/:id/video`, this.removeVideoFromList.bind(this));
  }

  async addList(req, res) {
	try {
	  const { titulo, userId } = req.body;
	  const list = await this.listService.addList(titulo, userId);
	  new SuccessResult({
		msg: `${req.method} ${req.originalUrl}`,
		data: list,
	  }).handle(res);			
	} catch (error) {
	  console.error(error);
	  res.status(error.status || 500).json({ msg: error.msg || error.message, msgCode: error.msgCode });
    }
  }

  async addVideoToList(req, res) {
	try {
	  const { videoId } = req.body;
	  const { id } = req.params;
	  await this.listService.addVideoToList(videoId, id);
	  new SuccessResult({
		msg: `${req.method} ${req.originalUrl}`,
		data: true,
	  }).handle(res);			
	} catch (error) {
	  console.error(error);
	  res.status(error.status || 500).json({ msg: error.msg || error.message, msgCode: error.msgCode });
    }
  }
  
  async removeVideoFromList(req, res) {
	try {
	  const { videoId } = req.body;
	  const { id } = req.params;
	  await this.listService.removeVideoFromList(videoId, id);
	  new SuccessResult({
		msg: `${req.method} ${req.originalUrl}`,
		data: true,
	  }).handle(res);
	} catch (error) {
	  console.error(error);
	  res.status(error.status || 500).json({ msg: error.msg || error.message, msgCode: error.msgCode });
	}
  }

  async deleteList(req, res) {
	try {
	  const { id } = req.params;
	  await this.listService.deleteList(id);
	  new SuccessResult({
		msg: `${req.method} ${req.originalUrl}`,
		data: true,
	  }).handle(res);
	} catch (error) {
	  console.error(error);
	  res.status(error.status || 500).json({ msg: error.msg || error.message, msgCode: error.msgCode });
	}
  }
}

module.exports = ListController;

import express from "express";
import ListController from "../controllers/list.controller.js";
import ListService from "../services/list.service.js";

const router = express.Router();
const listService = new ListService();

new ListController(router, listService);

export default router;
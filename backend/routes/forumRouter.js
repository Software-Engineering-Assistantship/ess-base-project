const express = require("express");
const router = express.Router();

const upload = require("../config/multer");

const ForumController = require("../controllers/forumController");

// Rotas para Posts do Fórum
router.get('/', ForumController.forumPosts_get);

router.get('/:postId', ForumController.singleForumPost_get);

router.post('/create', upload.single("file"), ForumController.forumPost_create);

router.put('/edit/:postId', ForumController.forumPost_edit);

router.delete('/delete/:postId', ForumController.forumPost_delete);

// Rotas para Comentários do Fórum
router.post('/:postId/comments/create', ForumController.forumComment_create);

router.put('/:postId/comments/edit/:commentId', ForumController.forumComment_edit);

router.delete('/:postId/comments/delete/:commentId', ForumController.forumComment_delete);

module.exports = router;

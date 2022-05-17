const express = require('express');

const router = express.Router();
const PostsControllers = require('../controllers/posts');
const { isAuth } = require('../service/auth');
const handleErrorAsync = require('../service/handleErrorAsync');

router.get('/', isAuth, handleErrorAsync(PostsControllers.getPosts));

router.post('/', isAuth, handleErrorAsync(PostsControllers.createdPosts));

router.delete('/', isAuth, handleErrorAsync(PostsControllers.deleteAllPosts));

router.delete('/:id', isAuth, handleErrorAsync(PostsControllers.deleteOnePost));

router.patch('/:id', isAuth, handleErrorAsync(PostsControllers.updateOnePost));

module.exports = router;

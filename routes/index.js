const express = require('express');

const router = express.Router();
const PostsControllers = require('../controllers/posts');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/posts', PostsControllers.getPosts);

router.post('/posts', PostsControllers.createdPosts);

router.delete('/posts', PostsControllers.deleteAllPosts);

router.delete('/posts/:id', PostsControllers.deleteOnePost);

router.patch('/posts/:id', PostsControllers.updateOnePost);

module.exports = router;

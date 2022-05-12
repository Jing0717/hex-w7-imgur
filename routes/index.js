const express = require('express');

const router = express.Router();
const PostsControllers = require('../controllers/posts');
const handleErrorAsync = require('../handle/handleErrorAsync')
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/posts', handleErrorAsync(PostsControllers.getPosts));

router.post('/posts', handleErrorAsync(PostsControllers.createdPosts));

router.delete('/posts', handleErrorAsync(PostsControllers.deleteAllPosts));

router.delete('/posts/:id', handleErrorAsync(PostsControllers.deleteOnePost));

router.patch('/posts/:id', handleErrorAsync(PostsControllers.updateOnePost));

module.exports = router;

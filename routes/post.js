const express = require('express');

const router = express.Router();
const Post = require('../models/postsModel');
const handleSuccess = require('../handleSuccess');
const handleError = require('../handleError');
const mongoose = require('mongoose');

router.get('/', async (req, res, next) => {
  const post = await Post.find();
  handleSuccess(res, post);
});

router.post('/', async (req, res, next) => {
  const newPost = await Post.create(req.body);
  handleSuccess(res, newPost);
});

router.delete('/', async (req, res, next) => {
  const deletePost = await Post.deleteMany({});
  handleSuccess(res, deletePost);
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deletePost = await Post.deleteOne({
      _id: new mongoose.Types.ObjectId(req.params.id),
    });
    handleSuccess(res, deletePost);
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;

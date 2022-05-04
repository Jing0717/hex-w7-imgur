const handleError = require('../handle/handleError');
const handleSuccess = require('../handle/handleSuccess');
const Post = require('../models/postsModel');
const mongoose = require('mongoose');

const posts = {
  async getPosts(req, res) {
    const allPosts = await Post.find();
    handleSuccess(res, allPosts);
    res.end();
  },
  async createdPosts(req, res) {
    try {
      // const data = JSON.parse(req.body); express 做掉了
      const { body } = req;
      if (body.content) {
        const newPost = await Post.create({
          name: body.name,
          content: body.content,
          tags: body.tags,
          type: body.type,
        });
        handleSuccess(res, newPost);
      } else {
        handleError(res);
      }
    } catch (error) {
      handleError(res, error);
    }
  },
  async deleteAllPosts(req, res) {
    try {
      const deletePosts = await Post.deleteMany({});
      handleSuccess(res, deletePosts);
    } catch (error) {
      handleError(res, error);
    }
  },
  async deleteOnePost(req, res) {
    const { body, params } = req;
    try {
      const deletePost = await Post.deleteOne({
        _id: new mongoose.Types.ObjectId(params.id),
      });
      handleSuccess(res, deletePost);
    } catch (error) {
      handleError(res, error);
    }
  },
  async updateOnePost(req, res) {
    const { body, params } = req;
    try {
      const patchOnePost = await Post.findByIdAndUpdate(params.id, body);
      handleSuccess(res, patchOnePost);
    } catch (error) {
      handleError(res, error);
    }
  },
};

module.exports = posts;

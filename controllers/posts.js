const handleError = require('../handle/handleError');
const handleSuccess = require('../handle/handleSuccess');
const Post = require('../models/postsModel');
const User = require('../models/usersModel');
const mongoose = require('mongoose');

const posts = {
  async getPosts(req, res) {
    const timeSort = req.query.timeSort === 'asc' ? 'createdAt' : '-createdAt';
    const q = req.query.q !== undefined ? { content: new RegExp(req.query.q) } : {};
    const allPosts = await Post.find(q)
      .populate({
        path: 'user', // 會找 PostModal 裡的欄位 user
        select: 'name photo',
      })
      .sort(timeSort);
    handleSuccess(res, allPosts);
    res.end();
  },
  async createdPosts(req, res) {
    try {
      // const data = JSON.parse(req.body); express 做掉了
      const { body } = req;
      if (body.content) {
        const newPost = await Post.create({
          user: body.user,
          content: body.content,
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

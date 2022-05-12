const handleError = require('../handle/handleError');
const handleSuccess = require('../handle/handleSuccess');
const appError = require('../handle/appError');
const Post = require('../models/postsModel');
const User = require('../models/usersModel');
const mongoose = require('mongoose');

const posts = {
  async getPosts(req, res) {
    const timeSort = req.query.timeSort === 'asc' ? 'createdAt' : '-createdAt';
    const q =
      req.query.q !== undefined ? { content: new RegExp(req.query.q) } : {};
    const allPosts = await Post.find(q)
      .populate({
        path: 'user', // 會找 PostModal 裡的欄位 user
        select: 'name photo',
      })
      .sort(timeSort);
    handleSuccess(res, allPosts);
    res.end();
  },
  async createdPosts(req, res, next) {
    const { body } = req;
    if (body.content === undefined) {
      return next(appError(400, '你沒有填寫 content 資料', next));
    } else if (body.user === undefined) {
      return next(appError(400, '你沒有填寫 user ID', next));
    }
    const newPost = await Post.create({
      user: body.user,
      content: body.content,
    });
    handleSuccess(res, newPost);
  },
  async deleteAllPosts(req, res, next) {
    const deletePosts = await Post.deleteMany({});
    handleSuccess(res, deletePosts);
  },
  async deleteOnePost(req, res, next) {
    const { body, params } = req;
    const deletePost = await Post.deleteOne({
      _id: new mongoose.Types.ObjectId(params.id),
    });
    if (deletePost.deletedCount === 0) {
      return next(appError(400, '沒有此id貼文', next));
    }
    handleSuccess(res, deletePost);
  },
  async updateOnePost(req, res, next) {
    const { body, params } = req;
    const patchOnePost = await Post.findByIdAndUpdate(params.id, body);
    if (patchOnePost === null) {
      return next(appError(400, '沒有此id貼文，不可編輯', next));
    }
    handleSuccess(res, patchOnePost);
  },
};

module.exports = posts;

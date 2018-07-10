const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  blog: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  comment: { type: String, required: true }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

router.post('/', async (req, res) => {
  try {
    //console.log(req.body);
    const newComment = await Comment.create(req.body);
    res.status(200).json({new: newComment})
  } catch (e) {
    res.status(400).json({err: e.message});
  }
})

module.exports = router;

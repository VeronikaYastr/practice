const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newPost = new Schema({
  description: String,
  createdAt: Date,
  author: String,
  photoLink: String,
  deleted: Boolean,
  hashTags: [String],
  likes: [String]
});


module.exports = mongoose.model('Post', newPost);

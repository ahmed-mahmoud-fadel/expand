const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: String,
  date: { type: Date, default: Date.now },
  thumbnail: String,
  link: { type: String },
  active: { type: Boolean, default: false }
});

blogSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
module.exports = mongoose.model('BlogPost', blogSchema);

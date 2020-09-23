const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogPostSchema = new Schema({
  title: String,
  description: String,
  content: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  dateCreated: Date,
});

mongoose.model('blogPosts', blogPostSchema);

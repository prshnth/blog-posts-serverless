const mongoose = require('mongoose');
const BlogPost = mongoose.model('blogPosts');

module.exports = async (req, res, next) => {
  const post = await BlogPost.findOne({ _id: req.params.id });

  if (!req.user._id.equals(post.userId)) {
    return res
      .status(401)
      .send({ error: 'User is not authorized to perform this operation.' });
  }
  next();
};

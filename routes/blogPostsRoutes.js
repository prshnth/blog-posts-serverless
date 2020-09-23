const mongoose = require('mongoose');
const BlogPost = mongoose.model('blogPosts');
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  app.get('/api/blogPosts', async (req, res) => {
    try {
      const allPosts = await BlogPost.find();
      res.send(allPosts);
    } catch (error) {
      res.status(422).send(error);
    }
  });

  app.post('/api/blogPosts', requireLogin, async (req, res) => {
    const { title, description, content } = req.body;

    const blogPost = new BlogPost({
      title,
      description,
      content,
      userId: req.user.id,
      dateCreated: Date.now(),
    });

    try {
      const newPost = await blogPost.save();
      res.send(newPost);
    } catch (error) {
      res.status(422).send(error);
    }
  });
};

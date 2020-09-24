const mongoose = require('mongoose');
const BlogPost = mongoose.model('blogPosts');
const requireLogin = require('../middlewares/requireLogin');
const isAuthorized = require('../middlewares/isAuthorized');

module.exports = (app) => {
  app.get('/api/blogPosts', async (req, res) => {
    try {
      const allPosts = await BlogPost.find();
      res.send(allPosts);
    } catch (error) {
      res.status(422).send(error);
    }
  });

  app.get('/api/user/posts', requireLogin, async (req, res) => {
    try {
      const allPostsByUser = await BlogPost.find({ userId: req.user.id });
      res.send(allPostsByUser);
    } catch (error) {
      res.status(422).send(error);
    }
  });

  app.get('/api/post/:id', async (req, res) => {
    try {
      const post = await BlogPost.findOne({ _id: req.params.id });
      res.send(post);
    } catch (error) {
      res.status(422).send(error);
    }
  });

  app.delete('/api/post/:id', requireLogin, isAuthorized, async (req, res) => {
    try {
      await BlogPost.deleteOne({ _id: req.params.id });
      const posts = await BlogPost.find();
      res.send(posts);
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

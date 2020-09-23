const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = (app) => {
  app.get('/api/currentUserInfo', (req, res) => res.send(req.user));

  app.get('/api/user/:id', async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      res.send(user);
    } catch (error) {
      res.status(422).send(error);
    }
  });

  app.get('/api/users', async (req, res) => {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      res.status(422).send(error);
    }
  });
};

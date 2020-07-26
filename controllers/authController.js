const catchAsync = require('./../utils/catchAsync');
const { User } = require('../db/user');
const _ = require('lodash');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');

exports.generateAuthToken = (id, username) => {
  const token = jwt.sign(
    {
      id,
      username,
    },
    config.get('jwtPrivateKey')
  );
  return token;
};

exports.signup = catchAsync(async (req, res, next) => {
  let user = await User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] });
  if (user) return res.status(400).send('email or username is already exists.');

  user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    publicKey: req.body.publicKey,
    username: req.body.username,
    password: req.body.password,
  });
  await user.save();

  const token = this.generateAuthToken(user._id, req.body.username);

  const data = { accessToken: token };

  res.status(200).send(data);
});

exports.signin = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  // 1) Check if email and password exist
  if (!username || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  let user = await User.findOne({ username });
  if (!user) return res.status(400).send('Invalid email or password.');

  const passwordHash = await bcrypt.hash(password, user.salt);

  const validPassword = await user.validatePassword(user.password, passwordHash);

  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = this.generateAuthToken(user._id, username);

  res.send({
    username,
    accessToken: token,
  });
});

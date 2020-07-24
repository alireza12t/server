const catchAsync = require('../utils/catchAsync');
const { User } = require('../db/user');

exports.get = catchAsync(async (req, res, next) => {
  if (!req.body.username) return res.status(400).send('please provide the username');

  const user = await User.findOne({ username: req.body.username });
  console.log(user);

  if (!user) return res.status(404).send('user not found');
  const data = {
    firstName: user.firstName,
    lastName: user.lastName,
    publicKey: user.publicKey,
  };
  res.status(200).send(data);
});

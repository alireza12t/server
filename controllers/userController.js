const catchAsync = require('../utils/catchAsync');
const { User } = require('../db/user');

exports.get = catchAsync(async (req, res, next) => {

  const user = await User.findOne({ username: req.params.username });
  console.log(user);

  if (!user) return res.status(404).send('user not found');
  const data = {
    firstName: user.firstName,
    lastName: user.lastName,
    publicKey: user.publicKey,
  };
  res.status(200).send(data);
});

const _ = require('lodash');

const { Doctor } = require('../db/doctor');

const catchAsync = require('../utils/catchAsync');
exports.create = catchAsync(async (req, res, next) => {
  const { specialty, birthPlace, birthDate, medicalId, email } = req.body;

  const doctors = await Doctor.find({ user: req.user.id });
  if (doctors.length) return res.status(400).send('Doctor profile for this user already exists');

  const doctor = new Doctor({
    specialty,
    birthPlace,
    birthDate,
    medicalId,
    email,
    user: req.user.id,
  });
  await doctor.save();
  const data = {
    specialty,
    birthPlace,
    birthDate,
    medicalId,
    email,
  };

  res.status(200).send(data);
});

exports.get = catchAsync(async (req, res, next) => {
  const { username, id } = req.user;

  const doctor = await Doctor.find({ user: id })
    .populate('user', 'username -_id')
    .select('specialty birthPlace birthDate medicalId email isProfileCompleted');

  res.status(200).send(doctor);
});

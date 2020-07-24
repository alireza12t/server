var router = require('express').Router();

const logger = require('../api/logger');

const rethink = require('../db/rethinkdb');
const { Patient } = require('../db/patient');
const catchAsync = require('../utils/catchAsync');

exports.create = catchAsync(async (req, res, next) => {
  const { birthDate, birthPlace, fatherBirthPlace, motherBirthPlace, bloodType, hairColor, eyeColor, email } = req.body;

  const patients = await Patient.find({ user: req.user.id });
  if (patients.length) return res.status(400).send('Patient profile for this user already exists');

  const patient = new Patient({
    birthDate,
    birthPlace,
    fatherBirthPlace,
    motherBirthPlace,
    bloodType,
    hairColor,
    eyeColor,
    email,
    user: req.user.id,
  });

  await patient.save();

  res.send(patient);
});

exports.get = catchAsync(async (req, res, next) => {
  const { username, id } = req.user;

  const patient = await Patient.find({ user: id })
    .populate('user', 'username -_id')
    .select(
      'birthDate birthPlace fatherBirthPlace motherBirthPlace bloodType hairColor eyeColor email isProfileCompleted'
    );

  res.status(200).send(patient);
});

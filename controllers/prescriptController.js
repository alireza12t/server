const { Prescript } = require('../db/prescript');
const { User } = require('../db/user');
const catchAsync = require('../utils/catchAsync');

exports.create = catchAsync(async (req, res, next) => {
  const { username, id: doctorId } = req.user;
  const { patientUserName, list } = req.body;

  if (!patientUserName) return res.status(400).send('patiend id is not defiend');
  if (!list) return res.status(400).send('drugs list is not defiend');

  const validList = list.every((el) => typeof el.drugName === 'string' && typeof el.amount === 'string');
  if (!validList) return res.status(400).send('drugs list items must be string');

  const patient = await User.findOne({ username: patientUserName });
  if (!patient) return res.status(404).send('Patient not found');

  const prescript = new Prescript({
    doctorId,
    patientId: patient._id,
    list,
  });

  await prescript.save();
  res.status(200).send(prescript);
});

exports.get = catchAsync(async (req, res, next) => {
  const { username, id: patientId } = req.user;

  const prescripts = await Prescript.find({ patientId: patientId }).select('_id list');

  res.status(200).send(prescripts);
});

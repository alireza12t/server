const { Request } = require('../db/request');
const { Patient } = require('../db/patient');
const { User } = require('../db/user');

const catchAsync = require('../utils/catchAsync');

exports.create = catchAsync(async (req, res, next) => {
  const { username, id: doctorId } = req.user;
  const { patientUserName } = req.body;

  if (!patientUserName) return res.status(400).send('patient username in not defiend');

  const patient = await User.findOne({ username: patientUserName });
  if (!patient) return res.status(404).send('Patient not found');

  if (doctorId == patient._id) return res.status(400).send('doctorId and patientId cannot be equal');

  const doctor = await User.findById(doctorId);

  const request = new Request({
    doctorId,
    doctorFirstName: doctor.firstName,
    doctorLastName: doctor.lastName,
    patientId: patient._id,
    patientFirstName: patient.firstName,
    patientLastName: patient.lastName,
  });

  await request.save();

  res.status(200).send(request._id);
});

exports.getDoctorRequests = catchAsync(async (req, res, next) => {
  const { username, id } = req.user;
  const requests = await Request.find({ doctorId: id });
  const requestList = [];
  requests.forEach((el) => {
    requestList.push({
      requestId: el._id,
      patientFirstName: el.patientFirstName,
      patientLastName: el.patientLastName,
      isAccepted: el.isAccepted,
      medicalData: el.medicalData,
    });
  });

  res.status(200).send(requestList);
});

exports.getPatientRequests = catchAsync(async (req, res, next) => {
  const { username, id } = req.user;
  const requests = await Request.find({ patientId: id });
  const requestList = [];
  requests.forEach((el) => {
    requestList.push({
      requestId: el._id,
      doctorFirstName: el.doctorFirstName,
      doctorLastName: el.doctorLastName,
      isAccepted: el.isAccepted,
    });
  });

  res.status(200).send(requestList);
});

exports.cancelRequest = catchAsync(async (req, res, next) => {
  const { username, id } = req.user;
  const { id: requestId } = req.params;
  if (!requestId) return res.status(400).send('request id not defined');

  const request = await Request.findOne({ $and: [{ doctorId: id }, { _id: requestId }] });

  if (!request) return res.status(404).send('request for this doctor not exists');

  await request.deleteOne({ _id: requestId });

  res.status(200).send('request is deleted');
});
exports.rejectRequest = catchAsync(async (req, res, next) => {
  const { username, id } = req.user;
  const { id: requestId } = req.params;
  const { isAccepted } = req.body;
  if (!requestId) return res.status(400).send('request id not defined');
  if (!isAccepted) return res.status(400).send('Accepted value not defined');

  const request = await Request.findOne({ $and: [{ patientId: id }, { _id: requestId }] });
  if (!request) return res.status(400).send('request for this user not exists');

  await request.updateOne({
    isAccepted: 'false',
  });

  res.status(200).send(request._id);
});
exports.acceptRequest = catchAsync(async (req, res, next) => {
  const { username, id } = req.user;
  const { id: requestId } = req.params;
  const { isAccepted } = req.body;
  if (!requestId) return res.status(400).send('request id not defined');
  if (!isAccepted) return res.status(400).send('Accepted value not defined');

  const request = await Request.findOne({ $and: [{ patientId: id }, { _id: requestId }] });
  if (!request) return res.status(400).send('request for this user not exists');

  await request.updateOne({
    isAccepted: 'true',
  });

  res.status(200).send(request._id);
});

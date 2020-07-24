const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
  doctorId: { type: String, required: true },
  doctorFirstName: { type: String, required: true },
  doctorLastName: { type: String, required: true },
  patientId: { type: String, required: true },
  patientFirstName: { type: String, required: true },
  patientLastName: { type: String, required: true },
  medicalData: { type: String, default: '' },
  isAccepted: { type: String, default: '' },
});

const Request = mongoose.model('Request', requestSchema);

module.exports = { Request };

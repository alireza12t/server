const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
  birthDate: {
    type: String,
    required: true,
  },
  birthPlace: {
    type: String,
    required: true,
  },
  fatherBirthPlace: {
    type: String,
    required: true,
  },
  motherBirthPlace: {
    type: String,
    required: true,
  },
  bloodType: {
    type: String,
    required: true,
  },
  hairColor: {
    type: String,
    required: true,
  },
  eyeColor: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
  },
  isProfileCompleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Patient profile must belong to a user'],
  },
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = { Patient };

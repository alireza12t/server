const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
  specialty: {
    type: String,
    required: true,
  },
  birthPlace: {
    type: String,
    required: true,
  },
  birthDate: {
    type: String,
    required: true,
  },
  medicalId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isProfileCompleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Doctor profile must belong to a user'],
  },
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = { Doctor };

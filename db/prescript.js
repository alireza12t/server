const mongoose = require('mongoose');

const prescriptSchema = mongoose.Schema({
  doctorId: {
    type: String,
    required: true,
  },
  patientId: {
    type: String,
    required: true,
  },
  list: [
    {
      drugName: String,
      amount: String,
    },
  ],
});

const Prescript = mongoose.model('Prescript', prescriptSchema);

module.exports = { Prescript };

const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
    filePath: { type: String, required: true },
    description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, enum: ['patient', 'doctor', 'hospital', 'lab', 'store'], required: true },
    specialization: { type: String }, // For doctors
    license: { type: String }, // For doctors, hospitals, labs, stores
    address: { type: String }, // For hospitals, labs, stores
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
const Receipt = require('../models/Receipt');

// Get Receipts for Patient
exports.getPatientReceipts = async (req, res) => {
    try {
        const receipts = await Receipt.find({ patientId: req.user.id });
        res.json(receipts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get Receipts for Doctor
exports.getDoctorReceipts = async (req, res) => {
    try {
        const receipts = await Receipt.find({ doctorId: req.user.id });
        res.json(receipts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
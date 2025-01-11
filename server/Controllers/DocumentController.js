const Document = require('../models/Document');

// Upload Document
exports.uploadDocument = async (req, res) => {
    const { patientId, appointmentId, filePath, description } = req.body;

    try {
        const document = new Document({
            patientId,
            doctorId: req.user.id,
            appointmentId,
            filePath,
            description,
        });

        await document.save();
        res.status(201).json(document);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get Documents for Patient
exports.getPatientDocuments = async (req, res) => {
    try {
        const documents = await Document.find({ patientId: req.user.id });
        res.json(documents);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get Documents for Doctor
exports.getDoctorDocuments = async (req, res) => {
    try {
        const documents = await Document.find({ doctorId: req.user.id });
        res.json(documents);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
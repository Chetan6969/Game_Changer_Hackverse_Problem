const express = require('express');
const { auth, authorize } = require('../middleware/auth');
const { uploadDocument, getPatientDocuments, getDoctorDocuments } = require('../controllers/documentController');

const router = express.Router();

router.post('/', auth, authorize('doctor'), uploadDocument);
router.get('/patient', auth, authorize('patient'), getPatientDocuments);
router.get('/doctor', auth, authorize('doctor'), getDoctorDocuments);

module.exports = router;
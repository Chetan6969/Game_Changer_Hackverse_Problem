const express = require('express');
const { auth, authorize } = require('../middleware/auth');
const { getPatientReceipts, getDoctorReceipts } = require('../controllers/receiptController');

const router = express.Router();

router.get('/patient', auth, authorize('patient'), getPatientReceipts);
router.get('/doctor', auth, authorize('doctor'), getDoctorReceipts);

module.exports = router; 
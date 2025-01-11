const express = require('express');
const { auth, authorize } = require('../middleware/auth');
const { createAppointment, generateReceipt, getPatientAppointments, getDoctorAppointments } = require('../controllers/appointmentController');

const router = express.Router();

router.post('/', auth, authorize('patient'), createAppointment);
router.post('/:id/receipt', auth, authorize('doctor'), generateReceipt);
router.get('/patient', auth, authorize('patient'), getPatientAppointments);
router.get('/doctor', auth, authorize('doctor'), getDoctorAppointments);

module.exports = router;
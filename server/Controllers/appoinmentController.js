const Appointment = require('../models/Appointment');
const Receipt = require('../models/Receipt');

// Create Appointment
exports.createAppointment = async (req, res) => {
    const { doctorId, appointmentDate, notes } = req.body;

    try {
        const appointment = new Appointment({
            patientId: req.user.id,
            doctorId,
            appointmentDate,
            notes,
        });

        await appointment.save();
        res.status(201).json(appointment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Generate Receipt
exports.generateReceipt = async (req, res) => {
    const { amount, details } = req.body;
    const appointmentId = req.params.id;

    try {
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        const receipt = new Receipt({
            appointmentId,
            patientId: appointment.patientId,
            doctorId: appointment.doctorId,
            amount,
            details,
        });

        await receipt.save();
        appointment.receipt = receipt._id;
        await appointment.save();

        res.status(201).json(receipt);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get Appointments for Patient
exports.getPatientAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ patientId: req.user.id }).populate('receipt');
        res.json(appointments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get Appointments for Doctor
exports.getDoctorAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ doctorId: req.user.id }).populate('receipt');
        res.json(appointments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
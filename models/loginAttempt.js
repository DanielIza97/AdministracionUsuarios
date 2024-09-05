const mongoose = require('mongoose');

const loginAttemptSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    phone: String,
    otp: String,
    isSuccess: Boolean,
    ipAddress: String,
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('LoginAttempt', loginAttemptSchema);

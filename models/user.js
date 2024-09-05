const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phone: { type: String, required: true, unique: true },
    otp: String,
    otpExpires: Date,
    isVerified: { type: Boolean, default: false },
    lastLogin: Date,
});

module.exports = mongoose.model('User', userSchema);

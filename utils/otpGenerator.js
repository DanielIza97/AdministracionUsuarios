module.exports.generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // OTP de 6 dígitos
    const otpExpires = Date.now() + 10 * 60000; // Expira en 10 minutos
    return { otp, otpExpires };
};
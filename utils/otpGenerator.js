module.exports.generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // OTP de 6 dígitos
    const otpExpires = Date.now() + 20 * 1000; // Expira en 20 segundos
    return { otp, otpExpires };
};
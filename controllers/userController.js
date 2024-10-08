const User = require('../models/user');
const LoginAttempt = require('../models/loginAttempt');
const { generateOTP } = require('../utils/otpGenerator');

// Registro de usuario y envío de OTP
exports.registerUser = async (req, res) => {
    const { phone } = req.body;

    try {
        const { otp, otpExpires } = generateOTP();
        let user = await User.findOne({ phone });

        if (!user) {
            user = new User({ phone, otp, otpExpires });
        } else {
            user.otp = otp;
            user.otpExpires = otpExpires;
        }
        await user.save();


        res.status(201).json({ message: 'OTP enviado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};

// Verificar OTP
exports.verifyOTP = async (req, res) => {
    const { phone, otp } = req.body;

    try {
        const user = await User.findOne({ phone });

        if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ error: 'OTP inválido o expirado' });
        }

        user.isVerified = true;
        user.lastLogin = new Date();
        await user.save();

        // Registro de intento de inicio de sesión exitoso
        await LoginAttempt.create({
            userId: user._id,
            phone,
            otp,
            isSuccess: true,
            ipAddress: req.ip,
        });

        res.status(200).json({ message: 'Usuario verificado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al verificar el OTP' });
    }
};

// Renovar OTP
exports.renewOTP = async (req, res) => {
    const { phone } = req.body;

    try {
        const user = await User.findOne({ phone });

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const now = Date.now();
        if (user.otpExpires > now) {
            return res.status(400).json({ error: 'OTP aún válido. Solicite la verificación del OTP actual.' });
        }

        const { otp, otpExpires } = generateOTP();
        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        // Aquí puedes enviar el nuevo OTP al teléfono del usuario.

        res.status(200).json({ message: 'Nuevo OTP enviado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al renovar el OTP' });
    }
};

// Obtener usuario por ID
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};
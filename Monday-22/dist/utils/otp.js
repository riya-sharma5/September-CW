import crypto from 'crypto';
import nodemailer from 'nodemailer';
export const generateOTP = () => {
    const otp = crypto.randomInt(100000, 999999);
    return otp.toString();
};
export const sendOTP = async (email, OTP) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_SERVICE_USER,
            pass: process.env.EMAIL_SERVICE_PASS,
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_SERVICE_USER,
        to: email,
        subject: 'Your OTP',
        text: `Your OTP is: ${OTP}`,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return info;
    }
    catch (error) {
        console.error('Failed to send OTP email:', error);
        throw error;
    }
};
//# sourceMappingURL=OTP.js.map
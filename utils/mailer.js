const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

async function sendPasswordResetEmail(toEmail, resetUrl) {
    await transporter.sendMail({
        from: `"Egypt Through the Ages" <${process.env.GMAIL_USER}>`,
        to: toEmail,
        subject: 'Reset your password',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
                <h2 style="color: #050505;">Reset your password</h2>
                <p>You requested to reset your password for Egypt Through the Ages.</p>
                <p>
                    <a href="${resetUrl}" style="display: inline-block; background: #050505; color: #F5F5F5; padding: 12px 24px; border-radius: 999px; text-decoration: none; margin: 16px 0;">
                        Reset Password
                    </a>
                </p>
                <p style="color: #666; font-size: 13px;">This link expires in 1 hour. If you didn't request this, you can safely ignore this email.</p>
            </div>
        `
    });
}

module.exports = { sendPasswordResetEmail };
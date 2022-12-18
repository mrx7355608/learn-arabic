const nodemailer = require("nodemailer");
const config = require("@config/index");
const { createToken } = require("./tokens");

class Email {
    setupTransport() {
        const transport = nodemailer.createTransport({
            host: config.MAIL_HOST,
            port: config.MAIL_PORT,
            auth: {
                user: config.MAIL_USERNAME,
                pass: config.MAIL_PASSWORD,
            },
        });
        return transport;
    }

    prepareEmail(recipient_email, userid) {
        const token = createToken(userid);
        const message = createEmailVerificationMessage(recipient_email, token);
        return message;
    }

    async send(user_email, userid) {
        const transport = this.setupTransport();
        const message = this.prepareEmail(user_email, userid);
        const response = await transport.sendMail(message);
        return response;
    }
}

const createEmailVerificationMessage = (recipient_email, token) => {
    return {
        from: config.MAIL_SENDER,
        to: recipient_email,
        subject: "Email Verification",
        html: `
            <div style="padding: 10px" >
                <p style="font-size:20px" >Thank you for signing up</p>
                <p>Please verify your email below</p>
                <a 
                    style="
                    border-radius: 1000px;
                    background: #2d2d2d;
                    color: white;
                    outline: none;
                    border: none;
                    font-weight: 500;
                    font-size: 13px;
                    padding: 9px 15px;
                    text-decoration: none;
                    "
                    href="http://localhost:8000/api/v1/auth/verify-email?token=${token}" >
                    Verify Email
                </a>
            </div>
    `,
    };
};

module.exports = Email;

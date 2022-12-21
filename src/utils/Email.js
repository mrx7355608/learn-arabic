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

    async send(message) {
        const transport = this.setupTransport();
        const response = await transport.sendMail(message);
        return response;
    }
}

class ResetPasswordEmail extends Email {
    constructor() {
        super();
    }

    createMessage(recipient_email, token) {
        const message = {
            from: config.MAIL_SENDER,
            to: recipient_email,
            subject: "Reset Password",
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
        return message;
    }

    async sendEmail(userid, recipient_email) {
        const token = createToken(userid);
        const message = this.createMessage(recipient_email, token);
        await this.send(message);
    }
}

class AccountVerificationEmail extends Email {
    constructor() {
        super();
    }

    createMessage(recipient_email, token) {
        const message = {
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
        return message;
    }

    async sendEmail(recipient_email, userid) {
        const token = createToken(userid);
        const message = this.createMessage(recipient_email, token);
        this.send(message);
    }
}

module.exports = { AccountVerificationEmail, ResetPasswordEmail };

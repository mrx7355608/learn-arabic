const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const config = require("@config/index");

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
        const token = jwt.sign({ id: userid }, config.TOKEN_SECRET, {
            expiresIn: "5m",
        });
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
                <p>Thank you for signing up</p>
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
                    padding: 15px 9px;
                    "
                    href="http://localhost:8000/verify-email?token=${token}" >
                    Verfify Email
                </a>
    `,
    };
};

module.exports = Email;

module.exports = {
    // General
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    DB_URL: process.env.DB_URL,
    SESSION_SECRET: process.env.SESSION_SECRET,

    // Tests
    TEST_USER_EMAIL: process.env.TEST_USER_EMAIL,
    TEST_USER_PASSWORD: process.env.TEST_USER_PASSWORD,

    // Emails
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_USERNAME: process.env.MAIL_USERNAME,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    MAIL_SENDER: process.env.MAIL_SENDER,

    TOKEN_SECRET: process.env.TOKEN_SECRET,
};

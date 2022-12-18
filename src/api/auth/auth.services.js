const ApiError = require("@utils/ApiError");
const Email = require("@utils/Email");
const { verifyToken } = require("@utils/tokens");
class AuthServices {
    constructor(userDb) {
        this.userDb = userDb;
    }

    async register(data) {
        const user = await this.userDb.getUserByEmail(data.email);
        if (user) {
            throw new ApiError("This email is already registered", 400);
        }
        // Create a new user
        const newUser = await this.userDb.createUser(data);
        // Send verification email
        const emailer = new Email();
        await emailer.send(newUser.email, newUser._id);
        // return response
        return { newUser };
    }

    async verifyEmail(token) {
        // check if token exists
        if (!token) throw new ApiError("Verification token is missing", 400);
        // verify token
        const payload = verifyToken(token);
        // check if a user exists
        const user = await this.userDb.getUser(payload.id);
        if (!user) throw new ApiError("Email not registered!", 400);

        await this.userDb.verifyUserEmail(payload.id);
    }

    async resendVerificationEmail(email) {
        const user = await this.userDb.getCompleteUserDetails({ email });
        if (!user) throw new ApiError("User not found", 400);
        const emailer = new Email();
        await emailer.send(user.email, user._id);
    }
}

module.exports = AuthServices;

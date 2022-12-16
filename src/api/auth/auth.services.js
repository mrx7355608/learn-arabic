const UserServices = require("@api/users/user.services");
const { createUser } = require("@api//users/user.data");
const { userExists } = require("../users/user.data");
const ApiError = require("@utils/ApiError");

class AuthServices {
    static userServices = new UserServices();

    async register(data) {
        if (userExists({ email: data.email })) {
            throw new ApiError(
                "This email is already registered, consider logging in",
                400
            );
        }
        const newUser = await createUser(data);
        return { newUser };
    }
}

module.exports = AuthServices;

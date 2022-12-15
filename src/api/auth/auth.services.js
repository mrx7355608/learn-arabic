const UserServices = require("@api/users/user.services");
const { createUser } = require("@api//users/user.data");

class AuthServices {
    static userServices = new UserServices();

    async register(data) {
        const newUser = await createUser(data);
        return { newUser };
    }
}

module.exports = AuthServices;

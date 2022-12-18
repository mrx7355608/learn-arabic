const UserModel = require("./user.model");

class UserDb {
    async getUser(id) {
        const user = await UserModel.findById(id);
        return user;
    }

    async getCompleteUserDetails(filter) {
        const user = await UserModel.findOne(
            filter,
            "+email +password +isEmailVerified +isAccountActive"
        );
        return user;
    }

    async getUserByEmail(email) {
        const user = await UserModel.findOne({ email });
        return user;
    }

    async createUser(userData) {
        const newUser = await UserModel.create(userData);
        return newUser;
    }

    async updateUser(id, data) {
        const updatedUserData = await UserModel.findByIdAndUpdate(id, data, {
            new: true,
            $projection: {
                email: false,
                password: false,
                isEmailVerified: false,
                isAccountActive: false,
            },
        });
        return updatedUserData;
    }

    async deleteUser(id) {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        return deletedUser;
    }

    async verifyUserEmail(id) {
        const doc = await UserModel.findByIdAndUpdate(id, {
            isEmailVerified: true,
        });
        return doc;
    }
    // exports.resetPassword = async (id) => {};
    // exports.forgotPassword = async (id) => {};
}

module.exports = UserDb;

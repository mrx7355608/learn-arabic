const UserModel = require("./user.model");

exports.getUser = async (id) => {
    const user = await UserModel.findById(id);
    return user;
};

exports.getUserByEmail = async (email) => {
    const user = await UserModel.findOne({ email });
    return user;
};

exports.createUser = async (userData) => {
    const newUser = await UserModel.create({ ...userData, role: "user" });
    return newUser;
};

exports.updateUser = async (id, data) => {
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
};

exports.deleteUser = async (id) => {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    return deletedUser;
};

// exports.verifyEmail = async (id) => {
//     // TODO: return true or false based on the update success
//     const verified = await UserModel.findByIdAndUpdate(id, {
//         isEmailVerified: true,
//     });
//     return verified;
// };
// exports.resetPassword = async (id) => {};
// exports.forgotPassword = async (id) => {};

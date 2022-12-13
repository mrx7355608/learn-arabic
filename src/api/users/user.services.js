const {
    getUser,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
    getCompleteUserDetails,
} = require("./user.data");
const ApiError = require("@utils/ApiError");

class UserServices {
    async fetchCompleteUser(filter) {
        const user = await getCompleteUserDetails(filter);
        return { user };
    }

    async fetch(id) {
        const user = await getUser(id);
        if (user == null) throw new ApiError("User not found", 404);
        return { user };
    }

    async fetchByEmail(email) {
        const user = await getUserByEmail(email);
        if (user == null) throw new ApiError("User not found", 404);
        return { user };
    }
    async create(data) {
        const newUser = await createUser(data);
        return { newUser };
    }

    async update(id, data) {
        await this.fetch(id);
        const updated = await updateUser(id, data);
        if (updated == null)
            return new ApiError("Failed to updated your info", 400);
        return { updated };
    }

    async delete(id) {
        await this.fetch(id);
        const deleted = await deleteUser(id);
        if (deleted == null)
            return new ApiError("Failed to delete your account", 400);
        return { deleted };
    }
}

module.exports = UserServices;

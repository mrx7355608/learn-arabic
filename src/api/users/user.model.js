const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        min: 3,
    },
    lname: {
        type: String,
        required: true,
        min: 3,
    },
    email: {
        type: String,
        required: true,
        select: false,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
        select: false,
    },
    // Used to check that if account is deleted or not
    isAccountActive: {
        type: Boolean,
        default: true,
        select: false,
    },
});

// Hash password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    next();
});
// Assign random profile pictures

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;

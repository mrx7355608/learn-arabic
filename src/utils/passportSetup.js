const { Strategy } = require("passport-local");
const { getCompleteUserDetails, getUser } = require("@api/users/user.data");

module.exports = (passport) => {
    passport.use(
        new Strategy(
            { usernameField: "email" },
            async (email, password, callback) => {
                try {
                    const user = await getCompleteUserDetails({
                        email,
                    });

                    // User exists
                    if (user == null) {
                        return callback(null, false, {
                            message: "No user found with this email",
                        });
                    }

                    // Verified email
                    if (user.isEmailVerified == false) {
                        return callback(null, false, {
                            message: "Please verify your email to login",
                        });
                    }

                    // Validate password
                    const validPassword = await user.validatePassword(password);
                    if (!validPassword) {
                        return callback(null, false, {
                            message: "Incorrect email or password",
                        });
                    }

                    return callback(null, user);
                } catch (err) {
                    return callback(err);
                }
            }
        )
    );

    // Serialize
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Deserialize
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await getUser(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};

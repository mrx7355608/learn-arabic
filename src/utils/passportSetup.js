const { Strategy } = require("passport-local");
const UserServices = require("@api/users/user.services");
const userServices = new UserServices();

module.exports = (passport) => {
    passport.use(
        new Strategy(
            { usernameField: "email" },
            async (email, password, callback) => {
                try {
                    const user = await userServices.fetchByEmail(email);

                    // User exists
                    if (user == null) return callback(null, false);

                    // Validate password
                    if (!(await user.validatePassword(password)))
                        return callback(null, false);

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
            const user = await userServices.fetch(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};

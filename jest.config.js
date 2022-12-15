module.exports = {
    testEnvironment: "node",
    verbose: true,
    moduleNameMapper: {
        "^@config(.*)$": "<rootDir>/src/config/$1",
        "^@middlewares(.*)$": "<rootDir>/src/middlewares/$1",
        "^@utils(.*)$": "<rootDir>/src/utils/$1",
        "^@api(.*)$": "<rootDir>/src/api/$1",
    },
};

module.exports = {
    rootDir: 'src',
    testEnvironment: 'node',
    testRegex: '/__tests__/.*test\\.ts$',
    testTimeout: 1000,
    transform: {
        '^.+\\.ts$': ['ts-jest'],
    },
};

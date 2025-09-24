/* eslint-disable import/no-unused-modules */
export default {
    transform: {
        '^.+\\.[m?jt]sx?$': 'babel-jest',
    },
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
    },
    moduleDirectories: ['node_modules', 'src'],
    collectCoverageFrom: ['src/**/*'],
};

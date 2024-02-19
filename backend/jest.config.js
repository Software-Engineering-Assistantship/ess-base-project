module.exports = {

    testTimeout: 20000,

    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '',
    testRegex: '.steps.ts$',
    transform: {
    
    '^.+\\.(t|j)s$': 'ts-jest',
    
    },

    detectOpenHandles: true
    
    //setupFilesAfterEnv: ['./setupTests.ts'],
    
    };
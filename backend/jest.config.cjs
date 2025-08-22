module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json'],
  rootDir: '',
  testRegex: ['.*\.step\.js$'],  
  transform: {
    '^.+\\.(tsx?|jsx?)$': 'ts-jest',
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'ts-jest',
    '^.+\\.tsx?$': 'ts-jest', // Para arquivos TypeScript
    '^.+\\.jsx?$': 'babel-jest', // Para arquivos JavaScript
  },
  setupFilesAfterEnv: [],
  transformIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts', '.tsx']
};
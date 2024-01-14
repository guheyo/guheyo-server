module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
  ],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
  ],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@app/api/(.*)$': '<rootDir>/apps/api/src/$1',
    '^@app/bot/(.*)$': '<rootDir>/apps/bot/src/$1',
    '^@lib/domains$': '<rootDir>/libs/domains/src',
    '^@lib/domains/(.*)$': '<rootDir>/libs/domains/src/$1',
    '^@lib/shared$': '<rootDir>/libs/shared/src',
    '^@lib/shared/(.*)$': '<rootDir>/libs/shared/src/$1',
  },
  roots: [
    '<rootDir>/apps',
    '<rootDir>/libs',
  ],
}

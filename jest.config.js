module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  rootDir: './',
  roots: ['<rootDir>/src/', '<rootDir>'],
  modulePaths: ['<rootDir>/src/'],
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/__mocks__/styleMock.ts'
  },
  resetMocks: true
}

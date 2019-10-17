module.exports = {
  roots: ['<rootDir>/src'],
  testRegex: "((\\.|/*.)(spec))\\.js?$",
  moduleFileExtensions: ["js","jsx"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupFiles: "<rootDir>/jest.setup.js"
};

const config = require("./electron-builder.config.cjs");

module.exports = {
  ...config,
  publish: [
    {
      provider: "s3",
      bucket: "codewaffle-test",
      endpoint: "http://localhost:9000",
    },
  ],
};

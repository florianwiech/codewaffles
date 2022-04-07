const config = require("./electron-builder.config");

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

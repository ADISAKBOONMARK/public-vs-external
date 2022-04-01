/* eslint-disable eqeqeq */
let config = require("../config/IConfig.test");

describe("Integrat", async function () {
  before(async () => {
    const _config = require("../config/Config.test.js");
    config = await _config.setting();
  });

  it("Scenario . . .", async function () {
    /// Logic
  });
});

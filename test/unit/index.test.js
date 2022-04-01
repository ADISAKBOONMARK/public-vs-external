/* eslint-disable eqeqeq */
let config = require("../config/IConfig.test");

describe("Unit", async function () {
  beforeEach(async () => {
    const _config = require("../config/Config.test.js");
    config = await _config.setting();

    config.land = {
      _x: 10,
      _y: 5,
    };
  });

  it("Add land with function addLandWithPublic", async function () {
    const start = 0;
    const len = start + 100;
    for (let i = start; i < len; i++) {
      await config.accounts.owner.Comparison.addLandWithPublic(
        config.land._x,
        config.land._y,
        i
      );

      process.stdout.write(
        "calling: " + Number.parseFloat((i / len) * 100).toFixed(0) + "%\r"
      );
    }
  });

  it("Add land with function addLandWithExternal", async function () {
    const start = 0;
    const len = start + 100;
    for (let i = start; i < len; i++) {
      await config.accounts.owner.Comparison.addLandWithExternal(
        config.land._x,
        config.land._y,
        i
      );

      process.stdout.write(
        "calling: " + Number.parseFloat((i / len) * 100).toFixed(0) + "%\r"
      );
    }
  });
});

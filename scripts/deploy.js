const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const Comparison = await hre.ethers.getContractFactory("Comparison");
  const comparison = await Comparison.deploy();
  await comparison.deployed();

  console.log("Comparison deployed to:", comparison.address);

  // write address to file
  const obj = {
    comparison: comparison,
  };

  try {
    fs.writeFileSync("artifacts/deployed.json", JSON.stringify(obj, null, 2));
  } catch (err) {
    console.error(err);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

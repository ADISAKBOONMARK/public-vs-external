/* eslint-disable node/no-unsupported-features/es-syntax */
const setting = async function () {
  const hre = require("hardhat");
  const { expect } = require("chai");

  const contracts = {};

  const Comparison = await hre.ethers.getContractFactory("Comparison");
  contracts.Comparison = await Comparison.deploy();
  await contracts.Comparison.deployed();

  const [owner, alice, bob, eve] = await hre.ethers.getSigners();

  const mash = {
    keccak256: hre.ethers.utils.solidityKeccak256,
    abi: {
      encodePacked: hre.ethers.utils.solidityPack,
    },
  };

  const signMsg = async (address, signer) => {
    const hash = mash.keccak256(
      ["bytes"],
      [
        mash.abi.encodePacked(
          ["string", "address"],
          ["verify(address _claimer)", address]
        ),
      ]
    );

    const digest = mash.keccak256(
      ["bytes"],
      [
        mash.abi.encodePacked(
          ["string", "bytes"],
          ["\x19Ethereum Signed Message:\n32", hash]
        ),
      ]
    );

    const signature = await hre.network.provider.send("eth_sign", [
      signer,
      hash,
    ]);

    const sig = hre.ethers.utils.splitSignature(signature);

    return {
      address: address,
      signer: signer,
      hash: hash,
      digest: digest,
      signature: signature,
      sig: sig,
    };
  };

  owner.signMessage = async (address) => {
    return signMsg(address, owner.address);
  };
  alice.signMessage = async (address) => {
    return signMsg(address, alice.address);
  };
  bob.signMessage = async (address) => {
    return signMsg(address, bob.address);
  };
  eve.signMessage = async (address) => {
    return signMsg(address, eve.address);
  };

  const mapExecutorToComparison = async (executor) => {
    return new hre.ethers.Contract(
      contracts.Comparison.address,
      contracts.Comparison.interface,
      executor
    );
  };

  const accounts = {
    owner: {
      ...owner,
      Comparison: await mapExecutorToComparison(owner),
    },
    alice: {
      ...alice,
      Comparison: await mapExecutorToComparison(alice),
    },
    bob: {
      ...bob,
      Comparison: await mapExecutorToComparison(bob),
    },
    eve: {
      ...eve,
      Comparison: await mapExecutorToComparison(eve),
    },
  };

  return {
    hre,
    expect,
    accounts,
    contracts,
  };
};

module.exports = {
  setting,
};

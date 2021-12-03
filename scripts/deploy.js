const main = async () => {
  require('dotenv').config()
  const voteContractFactory = await hre.ethers.getContractFactory('VoteDapp');
  const voteContract = await voteContractFactory.deploy({});

  await voteContract.deployed();

  console.log('Contract address: ', voteContract.address);
  console.log("https://etherscan.io/address/" + voteContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
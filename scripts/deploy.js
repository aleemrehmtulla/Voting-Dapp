const main = async () => {
  require('dotenv').config()
  const voteContractFactory = await hre.ethers.getContractFactory('VoteDapp');
  const voteContract = await voteContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.001'),
  });

  await voteContract.deployed();

  console.log('Contract address: ', voteContract.address);
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
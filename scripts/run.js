const main = async () => {
  const voteContractFactory = await hre.ethers.getContractFactory('VoteDapp');
  const voteContract = await voteContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.1'),
  });
  await voteContract.deployed();
  console.log('Contract address:', voteContract.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    voteContract.address
  );
  console.log(
    'Contract balance:',
    hre.ethers.utils.formatEther(contractBalance)
  );

  /*
   * Let's try two votes now
   */
  const voteTxn = await voteContract.vote('This is vote #1');
  await voteTxn.wait();

  const voteTxn2 = await voteContract.vote('This is vote #2');
  await voteTxn2.wait();

  contractBalance = await hre.ethers.provider.getBalance(voteContract.address);
  console.log(
    'Contract balance:',
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allVotes = await voteContract.getAllVotes();
  console.log(allVotes);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
const main = async () => {
  const voteContractFactory = await hre.ethers.getContractFactory('VoteDapp');
  const voteContract = await voteContractFactory.deploy({});
  await voteContract.deployed();
  console.log('Contract address:', voteContract.address);

  
  //  First manual vote
  const votetrumpTxn = await voteContract.votetrump('This is vote #1');
  await votetrumpTxn.wait();

  //  Second manual vote
  const votebidenTxn2 = await voteContract.votebiden('This is vote #2');
  await votebidenTxn2.wait();

  //  Third manual vote
  const votebidenTxn3 = await voteContract.votebiden('This is vote #2');
  await votebidenTxn3.wait();

  let totalVotes = await voteContract.getTotalVotes();
  let totalTrump = await voteContract.getTotalTrump();
  let totalBiden = await voteContract.getTotalBiden();
  console.log('Total votes:', totalVotes.toString());
  console.log("Total trump votes:", totalTrump.toString());
  console.log("Total biden votes:", totalBiden.toString());
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
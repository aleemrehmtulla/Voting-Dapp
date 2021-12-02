require('@nomiclabs/hardhat-waffle');
require('dotenv').config()
module.exports = {
  solidity: '0.8.0',
  networks: {
    rinkeby: {
      url: process.env.ALCHEMY,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');
require('@nomiclabs/hardhat-truffle5');

require('dotenv').config();

module.exports = {
  solidity: {
    version: '0.8.9',
  },
  networks: {
    hardhat: {
      forking: {
        url: 'https://eth-mainnet.alchemyapi.io/v2/DR4vvCPv0SoTbZMPOcsBp_jJm2uP6xxO',
        blockNumber: 13691490,
      },
    },
  },
  etherscan: {
    apiKey: process.env.BLOCK_EXPLORER_API_KEY,
  },
};

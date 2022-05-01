const { ethers } = require('hardhat');

async function main() {
  console.log('Deploying contract...');

  const Contract = await ethers.getContractFactory('TestAaveFlashLoan');
  const contract = await Contract.deploy();
  await contract.deployed();

  console.log('Contract deployed to:', contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

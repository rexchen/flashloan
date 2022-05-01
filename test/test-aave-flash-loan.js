const hre = require('hardhat');
const { ethers } = require('hardhat');
const BN = require('bn.js');
const { sendEther, pow } = require('./util');
const { DAI, DAI_WHALE, USDC, USDC_WHALE, USDT, USDT_WHALE } = require('./config');
const ERC20ABI = require('./ERC20ABI.json');

const IERC20 = artifacts.require('IERC20');
const TestAaveFlashLoan = artifacts.require('TestAaveFlashLoan');

contract('TestAaveFlashLoan', (accounts) => {
  const WHALE = USDC_WHALE;
  const TOKEN_BORROW = USDC;
  const DECIMALS = 6;
  const FUND_AMOUNT = pow(10, DECIMALS).mul(new BN(2000));
  const BORROW_AMOUNT = pow(10, DECIMALS).mul(new BN(1000));

  const ADDRESS_PROVIDER = '0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5';

  let testAaveFlashLoan;
  let token;
  beforeEach(async () => {
    token = await IERC20.at(TOKEN_BORROW);
    testAaveFlashLoan = await TestAaveFlashLoan.new(ADDRESS_PROVIDER);

    const VITALIK = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045';
    const REX = accounts[0];
    await hre.network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [WHALE],
    });

    // const ethBalance = await ethers.provider.getBalance(VITALIK);
    // await signer.sendTransaction({
    //   to: accounts[0],
    //   value: ethBalance.sub(ethers.utils.parseEther('1')),
    // });

    console.log('accounts[0]:' + REX);
    console.log('ETH: ' + (await ethers.provider.getBalance(REX)));
    console.log('USDC: ' + (await token.balanceOf(REX)));

    console.log('accounts[0]:' + WHALE);
    console.log('ETH: ' + (await ethers.provider.getBalance(WHALE)));
    console.log('USDC: ' + (await token.balanceOf(WHALE)));

    const signer = await ethers.getSigner(WHALE);
    const USDCContract = new ethers.Contract(USDC, ERC20ABI, ethers.provider);
    // await USDCContract.connect(signer).transfer(REX, 527915816100);

    console.log('accounts[0]:' + REX);
    console.log('ETH: ' + (await ethers.provider.getBalance(REX)));
    console.log('USDC: ' + (await token.balanceOf(REX)));

    console.log('accounts[0]:' + WHALE);
    console.log('ETH: ' + (await ethers.provider.getBalance(WHALE)));
    console.log('USDC: ' + (await token.balanceOf(WHALE)));

    // await sendEther(web3, REX, WHALE, 1);

    // // // send enough token to cover fee
    const bal = await token.balanceOf(WHALE);
    console.log('banlance:' + bal);
    // assert(true);
    assert(bal.gte(1), 'balance < FUND');
    await USDCContract.connect(signer).transfer(testAaveFlashLoan.address, 1000, {
      from: WHALE,
    });
  });

  it('flash loan', async () => {
    const tx = await testAaveFlashLoan.testFlashLoan(token.address, 2000, {
      from: WHALE,
    });
    for (const log of tx.logs) {
      console.log(log.args.message, log.args.val.toString());
    }
  });
});

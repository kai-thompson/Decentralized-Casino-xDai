require('dotenv').config()
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/fkpW6Z8j9-ENLIqwKucPMgu9TnZTwSw1',
      accounts: [process.env.TEST_PRIVATE_KEY],
    },
    matic: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.TEST_PRIVATE_KEY],
    },
    xdai: {
      url: "https://dai.poa.network",
      accounts: [process.env.PRIVATE_KEY],
    }
  }
};
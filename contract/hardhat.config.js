require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
// require("@nomiclabs/hardhat-etherscan")


module.exports = {
  solidity: "0.8.24",
  paths: {
    artifacts: "./src",
  },
  networks: {
    opencampus: {
      url: `https://rpc.open-campus-codex.gelato.digital/`,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      opencampus: "XXX",
    },
    customChains: [
      {
        network: "opencampus",
        chainId: 656476,
        urls: {
          apiURL: "https://edu-chain-testnet.blockscout.com/api",
          browserURL: "https://edu-chain-testnet.blockscout.com/",
        },
      },
    ],
  },
};
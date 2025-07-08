require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  
  networks: {
    // Локальная разработка
    hardhat: {
      chainId: 31337,
      accounts: {
        count: 20,
        initialIndex: 0,
        mnemonic: "test test test test test test test test test test test junk",
        path: "m/44'/60'/0'/0",
        accountsBalance: "10000000000000000000000", // 10000 ETH
      },
    },
    
    // Локальный тестовый узел
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
    
    // opBNB Testnet
    opbnbTestnet: {
      url: "https://opbnb-testnet-rpc.bnbchain.org",
      chainId: 5611,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 1000000000, // 1 gwei
      blockGasLimit: 100000000,
      timeout: 60000,
    },
    
    // opBNB Mainnet
    opbnbMainnet: {
      url: "https://opbnb-mainnet-rpc.bnbchain.org",
      chainId: 204,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 1000000000, // 1 gwei
      blockGasLimit: 100000000,
      timeout: 60000,
    },
    
    // BSC Testnet (fallback)
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 20000000000, // 20 gwei
    },
    
    // BSC Mainnet (fallback)
    bscMainnet: {
      url: "https://bsc-dataseed1.binance.org",
      chainId: 56,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 5000000000, // 5 gwei
    },
  },
  
  // Etherscan verification
  etherscan: {
    apiKey: {
      opbnbTestnet: process.env.OPBNB_API_KEY || "dummy",
      opbnbMainnet: process.env.OPBNB_API_KEY || "dummy",
      bscTestnet: process.env.BSC_API_KEY || "",
      bsc: process.env.BSC_API_KEY || "",
    },
    customChains: [
      {
        network: "opbnbTestnet",
        chainId: 5611,
        urls: {
          apiURL: "https://open-platform.nodereal.io/opbnb-testnet/contract/",
          browserURL: "https://testnet.opbnbscan.com"
        }
      },
      {
        network: "opbnbMainnet",
        chainId: 204,
        urls: {
          apiURL: "https://open-platform.nodereal.io/opbnb-mainnet/contract/",
          browserURL: "https://mainnet.opbnbscan.com"
        }
      }
    ]
  },
  
  // Gas reporter
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    gasPrice: 1, // gwei
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  
  // Paths
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  
  // Mocha settings
  mocha: {
    timeout: 60000
  },
  
  // Contract size limit
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  }
};
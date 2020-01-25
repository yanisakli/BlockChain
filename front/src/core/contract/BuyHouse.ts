import Web3 from 'web3'
import abi from '../../../abi'
import { Contract } from 'web3-eth-contract'
import { Eth } from 'web3-eth'

export default class BuyHouse {
  public Web3: Web3
  public Web3Eth: Eth
  MyContract: Contract;
  private kovanContract = '0xF0b7c70A2d7c748826Ff2d0BB0025Ad95709d364'
  private ContractAddress = process.env.VUE_APP_CONTRACT || this.kovanContract
  private Network = 'http://localhost:7545'
  private RopstenNetwork = 'https://kovan.infura.io/v3/68bfcafd4140410a946f788b01da2167'

  constructor() {
    // @ts-ignore
    this.Web3 = new Web3(Web3.givenProvider || this.RopstenNetwork)
    this.Web3Eth = this.Web3.eth
    this.MyContract = new this.Web3Eth.Contract(abi)
    this.MyContract.options.address = this.ContractAddress
  }

  public async getDefaultAccount() {
    console.log('await this.Web3Eth.getAccounts()', await this.Web3Eth.getAccounts())
    console.log('getDefaultAccount', this.Web3Eth.accounts.givenProvider.selectedAddress)
    return this.Web3Eth.accounts.givenProvider.selectedAddress
  }
}

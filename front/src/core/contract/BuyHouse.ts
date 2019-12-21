import Web3 from 'web3'
import abi from '../../../abi'
import { Contract } from 'web3-eth-contract'
import { Eth } from 'web3-eth';

const env = 'production' || process.env.NODE_ENV

export default class BuyHouse {
  public Web3: Web3
  public Web3Eth: Eth
  MyContract: Contract;
  private ContractAddress = process.env.VUE_APP_CONTRACT || '0xF542cf2d2E0075681f3E42C194592eea8d22C935'
  private Network = 'http://localhost:7545'
  private RopstenNetwork = 'https://kovan.infura.io/v3/68bfcafd4140410a946f788b01da2167'

  constructor() {
    console.log('process.env.VUE_APP_CONTRACT', process.env)
    // @ts-ignore
    // this.Web3 = new Web3(Web3.givenProvider || this.Network)
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

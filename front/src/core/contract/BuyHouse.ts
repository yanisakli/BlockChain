import Web3 from 'web3'
import abi from '../../../abi'
import { Contract } from 'web3-eth-contract'
import { Eth } from 'web3-eth';

export default class BuyHouse {
  public Web3: Web3
  public Web3Eth: Eth
  MyContract: Contract;
  private ContractAddress = process.env.VUE_APP_CONTRACT || '0x379c15ddA5BD82388e1f71d58DfA3ca9BAB1590e'
  private Network = 'http://localhost:7545'

  constructor() {
    console.log('process.env.VUE_APP_CONTRACT', process.env.VUE_APP_CONTRACT)
    // @ts-ignore
    this.Web3 = new Web3(Web3.givenProvider || this.Network)
    this.Web3Eth = this.Web3.eth
    this.MyContract = new this.Web3Eth.Contract(abi)
    this.MyContract.options.address = this.ContractAddress
  }

  public async getDefaultAccount() {
    const defaultAddress = await this.Web3Eth.getAccounts()
    return defaultAddress[0]
  }
}

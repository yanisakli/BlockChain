import Web3 from 'web3'
import abi from '../../../abi'
import { Contract } from 'web3-eth-contract'

export default class BuyHouse {
  public Web3Eth: Web3
  MyContract: Contract;
  private ContractAddress = '0x011Cc15aCe16D7dDdc1de2dEa91A507a9f244015'
  private Network = 'http://localhost:7545'

  constructor() {
    this.Web3Eth = new Web3(this.Network)
    this.MyContract = new this.Web3Eth.eth.Contract(abi)
    this.MyContract.options.address = this.ContractAddress
  }
}

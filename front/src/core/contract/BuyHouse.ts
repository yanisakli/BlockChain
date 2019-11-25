import Web3 from 'web3'
import abi from '../../../abi'
import { Contract } from 'web3-eth-contract'
import { Eth } from 'web3-eth';

export default class BuyHouse {
  public Web3: Web3
  public Web3Eth: Eth
  MyContract: Contract;
  private ContractAddress = '0xC15C0A0f3BDDF24BfD689C17E9b568830aA06f30'
  private Network = 'http://localhost:7545'

  constructor() {
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

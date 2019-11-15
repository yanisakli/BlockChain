import Vue from "vue";
import Web3 from 'web3'
import { Eth } from 'web3-eth'
import { Contract } from 'web3-eth-contract'

declare module "vue/types/vue" {
  // 3. Declare augmentation for Vue

  interface Vue {
    $Web3: Web3
    $Web3Eth: Eth
    $MyContract: Contract
  }
}

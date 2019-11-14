<template>
    <form>
        <b-field label="Size (m2)">
            <b-input v-model="size"></b-input>
        </b-field>
        <b-field label="Address">
            <b-input v-model="address"></b-input>
        </b-field>
        <b-field label="Price (Ethereum)">
            <b-input v-model="price"></b-input>
        </b-field>
        <b-button type="is-success" v-on:click="createHouse" expanded>Sell my house</b-button>
    </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BuyHouse from '../core/contract/BuyHouse'
const BuyHouseContract = new BuyHouse()

// Todo: remove this shit
const MyContract = BuyHouseContract.MyContract

@Component
export default class NewHouseFormComponent extends Vue {
  address: string = '27 Rue Lonnesse'
  size: string = '60'
  price: string = '50000'
  private ContractAddress = '0x011Cc15aCe16D7dDdc1de2dEa91A507a9f244015'
  async created() {
    const t = await MyContract.methods.getAllHouses().call()
    console.log('test', t)
  }

  async createHouse() {
    console.log('this.address', this.address)
    console.log('this.size', this.size)
    console.log('this.price', this.price)
    await MyContract.methods.createHouse(this.price, this.address, this.size).send({
      from: this.ContractAddress
    })
  }
}
</script>

<style scoped ="scss">

</style>

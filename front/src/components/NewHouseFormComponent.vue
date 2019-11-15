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

@Component
export default class NewHouseFormComponent extends Vue {
  address: string = '27 Rue Lonnesse'
  size: string = '60'
  price: string = '50000'
  async created() {
    console.log('this.$store', this.$MyContract)
    const t = await this.$MyContract.methods.getAllHouses().call()
    const o = await this.$MyContract.methods.getHousesByUser().call()
    console.log('default', this.$Web3Eth.defaultAccount)
    console.log('t', t)
    console.log('o', o)
  }
  mounted() {
  }

  async createHouse() {
    console.log('this.address', this.address)
    console.log('this.size', this.size)
    console.log('this.price', this.price)
    try {
      const t = await this.$MyContract.methods.createHouse(2, this.address, 4).send({
        from: this.$Web3Eth.defaultAccount,
        value: this.$Web3.utils.toWei('2', "ether")
      })
      console.log('t',t)
    } catch(error) {
      console.log(error)
    }
  }
}
</script>

<style scoped ="scss">

</style>

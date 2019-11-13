<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="columns">
      <div class="column is-offset-3 is-6 has-text-left">
        <h1 class="title">Créer une nouvelle maison : </h1>
        <form>
          <b-field label="Size">
            <b-input v-model="size"></b-input>
          </b-field>
          <b-field label="Address">
            <b-input v-model="address"></b-input>
          </b-field>
          <b-field label="Price">
            <b-input v-model="price"></b-input>
          </b-field>
          <b-button type="is-success" v-on:click="createHouse">Success</b-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BuyHouse from './core/contract/BuyHouse'
const BuyHouseContract = new BuyHouse()

// Todo: remove this shit
const MyContract = BuyHouseContract.MyContract

@Component({
  components: {
  },
})
export default class App extends Vue {
  address: string = '27 RUe Lonnesse'
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

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

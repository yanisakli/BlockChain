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
  }
  async mounted() {
    this.$MyContract.events.NewHouse({}, (error: any, data: any) => {
      console.log('data', data)
      this.$buefy.toast.open({
        type: 'is-success',
        message: 'Nouvelle maison créé'
      })
    })
  }

  async createHouse() {
    console.log('this.address', this.address)
    console.log('this.size', this.size)
    console.log('this.price', this.price)
    try {
      const t = await this.$MyContract.methods.createHouse(this.price, this.address, this.size).send({
        from: this.$Web3Eth.defaultAccount
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

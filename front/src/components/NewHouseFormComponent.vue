<template>
    <form>
        <b-field label="Size (m2)">
            <b-input v-model="defaultHouse.size"></b-input>
        </b-field>
        <b-field label="Address">
            <b-input v-model="defaultHouse.postalAddress"></b-input>
        </b-field>
        <b-field label="Country">
            <b-input v-model="defaultHouse.country"></b-input>
        </b-field>
        <b-field label="Disponibility">
            <b-input v-model="defaultHouse.disponibility"></b-input>
        </b-field>
        <b-field label="Number of bedroom">
            <b-input v-model="defaultHouse.nbRoom"></b-input>
        </b-field>
        <b-field label="Number of room">
            <b-input v-model="defaultHouse.nbPiece"></b-input>
        </b-field>
        <b-field label="Price (Ethereum)">
            <b-input v-model="defaultHouse.price"></b-input>
        </b-field>
        <b-button type="is-success" v-on:click="createHouse" expanded>Sell my house</b-button>
    </form>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import { HouseWithoutUser } from "@/definitions"

  @Component
  export default class NewHouseFormComponent extends Vue {
    defaultHouse: HouseWithoutUser = {
      postalAddress: "27 Rue Lonnesse, 75019 PARIS",
      size: 60,
      price: 50000,
      country: "France",
      disponibility: "28_09_2019",
      nbRoom: 4,
      nbPiece: 4
    }

    async created() {
    }

    async mounted() {
      this.$MyContract.events.NewHouse({}, (error: any, data: any) => {
        console.log("data", data)
        this.$buefy.toast.open({
          type: "is-success",
          message: "Nouvelle maison créé"
        })
      })
    }

    async createHouse() {
      console.log("this.defaultHouse", this.defaultHouse)
      try {
        await this.$MyContract.methods.createHouse(this.defaultHouse).send({
          from: this.$Web3Eth.defaultAccount
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
</script>

<style scoped="scss">

</style>

<template>
    <div id="one-house">
        <div class="columns">
            <div class="column is-offset-2 is-8" id="detail">
                <div class="hero-detail">
                    <div style="height: 280px"></div>
                </div>
                <div class="short-detail has-text-left">
                    <div class="content" v-if="House">
                        <div class="content">
                            <h1 class="title has-text-black">A beautiful appartment</h1>
                            <p class="subtitle has-text-black">
                                <span>{{ House.postalAddress }}</span>,
                                <span class="subtitle has-text-black is-bold">{{ House.country }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="subtitle has-text-right">Owner : {{ House.owner.name}}</p>
                            <p class="subtitle has-text-right label">Price : <b-tag rounded> {{ House.price }} Ethereum</b-tag></p>
                        </div>
                        <div class="about content">
                            <h2 class="subtitle">About</h2>
                            <br>
                            <p>The newest coworking space around, with breathtaking views of the Thames! Us&Co is a
                                spacious and comfortable workspace with fantastic amenities including a coffee bar,
                                outdoor patio seating for those sunny days, and of course super fast wifi.</p>
                        </div>
                        <div class="has-text-centered">
                            <b-button type="is-success" v-on:click="confirmCustom" :disabled="isOwnHouse">
                                {{ isOwnHouse ? 'Tsss... You can\'t buy your own house !' : 'Available now ! Buy it'}}
                            </b-button>
                        </div>
                        <hr>
                        <nav class="level">
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading">Size (m2)</p>
                                    <p class="title">{{ House.size }}</p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading">Nb bedroom</p>
                                    <p class="title">{{ House.nbRoom }}</p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading">Nb room</p>
                                    <p class="title">{{ House.nbPiece }}</p>
                                </div>
                            </div>
                        </nav>
                        <hr>
                        <div class="other">
                            <h2 class="subtitle">Others</h2>
                            <br>
                            <div class="other-item columns">
                                <div class="column is-2">
                                    <p>Coffee</p>
                                </div>
                                <div class="column is-offset-2 is-8">
                                    <p>Unlimited coffee and assorted tea. You're welcome to grab a cup in the kitchen
                                        and make yourself a cup of coffee.</p>
                                </div>
                            </div>
                            <div class="other-item columns">
                                <div class="column is-2">
                                    <p>Printing</p>
                                </div>
                                <div class="column is-offset-2 is-8">
                                    <p>Unlimited coffee and assorted tea. You're welcome to grab a cup in the kitchen
                                        and make yourself a cup of coffee.</p>
                                </div>
                            </div>
                            <div class="other-item columns">
                                <div class="column is-2">
                                    <p>Microwaves</p>
                                </div>
                                <div class="column is-offset-2 is-8">
                                    <p>Unlimited coffee and assorted tea. You're welcome to grab a cup in the kitchen
                                        and make yourself a cup of coffee.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import { House } from "@/definitions"

  @Component
  export default class AppOneHouse extends Vue {
    private HouseID?: string
    private House: House | null = null
    private isOwnHouse: boolean = false

    created() {
      this.HouseID = this.$route.params ? this.$route.params.id : undefined
    }

    async mounted() {
      try {
        const house = this.HouseID ? this.dtoHouse(await this.getHouseById(this.HouseID)) : undefined

        if (!house || house.id === '0' && house.price === '0') {
          this.$buefy.toast.open({ type: "is-danger", message: "No House was found" })
          return await this.$router.push('/')
        }

        console.log('House', house)

        this.isOwnHouse = house.owner.publicAddress === this.$Web3Eth.defaultAccount

        console.log('isOwnHouse', this.isOwnHouse)

        this.House = house

      } catch(error) {
        this.$buefy.toast.open({ type: "is-danger", message: "House cannot be found" })
        await this.$router.push('/')
      }
    }

    confirmCustom() {
      this.$buefy.dialog.confirm({
        title: "Buy House",
        message: `This house cost ${this.House && this.House.price || 0} Ethereum.
      Are you sur you spend it ?`,
        cancelText: "Decline",
        confirmText: "Accept",
        type: "is-success",
        onConfirm: async () => {

          if (!this.House || !this.House.id) {
            this.$buefy.toast.open({
              type: 'is-danger',
              message: "No House was found"
            })
            return
          }

          try {
            const owner = await this.changeOwner(this.House.id)
            this.$buefy.toast.open("User agreed")
          } catch(error) {
            console.log('onConfirm - error', error)
            this.$buefy.toast.open({
              type: 'is-danger',
              message: "Error on change owner"
            })
            return
          }
        }
      })
    }

    async getHouseById(houseId: string): Promise<any> {
      return await this.$MyContract.methods.getHouse(houseId).call()
    }

    async changeOwner(houseId: string): Promise<any> {

      if (!this.House) {
        this.$buefy.toast.open({
          type: 'is-danger',
          message: 'House was not found'
        })
        return
      }

      const price = this.House.price ? this.$Web3.utils.toWei(this.House.price.toString(), 'ether') : undefined

      console.log('price', price)

      if (!price) {
        this.$buefy.toast.open({
          type: 'is-danger',
          message: 'Price was not found'
        })
        return
      }

      const currentBalance = this.$Web3.utils.fromWei(await this.$Web3Eth.getBalance(this.$Web3Eth.defaultAccount!))

      if (currentBalance < this.House.price.toString(10)) {
        this.$buefy.toast.open({
          type: 'is-danger',
          message: 'Your balance is too low'
        })
        return
      }

      console.log('this.House.owner.publicAddress', this.House.owner.publicAddress)
      console.log('this.$Web3Eth.defaultAccount', this.$Web3Eth.defaultAccount)
      console.log('houseId', houseId)
      console.log('typeof houseId', parseInt(houseId))
      console.log('price', price)
      const owner = await this.$MyContract.methods.setHouseOwner(parseInt(houseId), this.House.owner.publicAddress).send({
        from: this.$Web3Eth.defaultAccount,
        value: price
      })
      console.log('owner', owner)
      return
    }

    dtoHouse(house: any): House {
      return {
        id: house.id,
        price: house.price,
        postalAddress: house.postalAddress,
        size: house.size,
        country: house.country,
        disponibility: house.disponibility,
        nbRoom: house.nbRoom,
        nbPiece: house.nbPiece,
        owner: {
          name: house.owner.name,
          publicAddress: house.owner.publicAddress,
          flag: house.owner.flag
        }
      }
    }
  }
</script>

<style scoped="scss">
    #one-house, #detail, #map {
    }

    #detail {
        display: flex;
        flex-direction: column;
    }

    .hero-detail {
        background: url('https://images.unsplash.com/photo-1443176161226-96cde1416c79');
        background-position: center;
        height: 250px;
        background-size: cover;
    }

    .other-item {

    }
</style>

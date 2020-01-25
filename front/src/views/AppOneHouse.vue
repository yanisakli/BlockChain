<template>
    <div id="one-house">
        <div class="section">
            <GoBackComponent></GoBackComponent>
            <div class="columns">
                <div class="column is-offset-2 is-8" id="detail">
                    <div class="hero-detail">
                        <div style="height: 280px"></div>
                    </div>

                    <div class="short-detail has-text-left">
                        <div v-if="House">
                            <div class="content principale">
                                <div>
                                    <h1 class="title has-text-black is-flex" style="justify-content: space-between;">
                                        A beautiful appartment
                                        <b-button
                                                v-if="isOwnHouse"
                                                type="is-danger"
                                                v-on:click="deleteHouse">
                                            Delete this house
                                        </b-button>
                                    </h1>
                                </div>
                                <p class="subtitle has-text-black">
                                    <span>{{ House.postalAddress }}</span>,
                                    <span class="subtitle has-text-black is-bold">{{ House.country }}</span>
                                </p>
                            </div>
                            <div>
                                <p class="has-text-right"><span class="is-bold">Owner</span> : {{ House.owner.name}}</p>
                                <p class="has-text-right"><span class="is-bold">Price : </span>
                                    <b-tag rounded type="is-primary"> {{ House.price }} Ethereum</b-tag>
                                </p>
                            </div>
                            <div class="about content">
                                <h2 class="subtitle">About</h2>
                                <br>
                                <p>The newest coworking space around, with breathtaking views of the Thames! Us&Co is a
                                    spacious and comfortable workspace with fantastic amenities including a coffee bar,
                                    outdoor patio seating for those sunny days, and of course super fast wifi.</p>
                            </div>
                            <div class="has-text-centered">
                                <template v-if="isConnected">
                                    <b-button type="is-success" v-on:click="openConfirmDialog" :disabled="isOwnHouse">
                                        {{ isOwnHouse ? "Tsss... You can't buy your own house !" : "Available now ! Buy it" }}
                                    </b-button>
                                </template>
                                <template v-else>
                                    <b-button type="is-danger" disabled="isOwnHouse">
                                        Vous devez être connecté pour acheter cette maison
                                    </b-button>
                                </template>
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
                                <h2 class="subtitle is-bold">Others</h2>
                                <br>
                                <div class="other-item columns">
                                    <div class="column is-2">
                                        <b>Coffee</b>
                                    </div>
                                    <div class="column is-offset-2 is-8">
                                        <p>Unlimited coffee and assorted tea. You're welcome to grab a cup in the
                                            kitchen
                                            and make yourself a cup of coffee.</p>
                                    </div>
                                </div>
                                <div class="other-item columns">
                                    <div class="column is-2">
                                        <b>Printing</b>
                                    </div>
                                    <div class="column is-offset-2 is-8">
                                        <p>Unlimited coffee and assorted tea. You're welcome to grab a cup in the
                                            kitchen
                                            and make yourself a cup of coffee.</p>
                                    </div>
                                </div>
                                <div class="other-item columns">
                                    <div class="column is-2">
                                        <b>Microwaves</b>
                                    </div>
                                    <div class="column is-offset-2 is-8">
                                        <p>Unlimited coffee and assorted tea. You're welcome to grab a cup in the
                                            kitchen
                                            and make yourself a cup of coffee.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
    </div>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import { House } from '@/definitions'
		import GoBackComponent from '@/components/GoBackComponent.vue'

	@Component({
      components: {
      	GoBackComponent: GoBackComponent
      }
    })
	export default class AppOneHouse extends Vue {
		private HouseID?: string
		private House: House | null = null
		private isOwnHouse: boolean = false
		private isConnected: boolean = false
		private isLoading: boolean = false

		created() {
			this.HouseID = this.$route.params ? this.$route.params.id : undefined
		}

		async mounted() {

			// Event register
			this.$MyContract.events.HouseDeleted({}, async (error: any, data: any) => {
				this.$buefy.toast.open({
					type: 'is-success',
					message: 'The house has been deleted'
				})
				await this.$router.push('/')
			})

			this.$MyContract.events.ChangeOwner({}, async () => {
				this.$buefy.toast.open({
					type: 'is-success',
					message: 'this house is yours now ! Be happy and Chill :)'
				})

				this.House = await this.displayHouse()

				this.isLoading = false
				return
			})

			try {
				this.House = await this.displayHouse()
			} catch (error) {
				this.$buefy.toast.open({ type: 'is-danger', message: error })
				await this.$router.push('/')
			}
		}

		async deleteHouse() {
			this.$buefy.dialog.confirm({
				title: 'Delete House',
				message: `Delete this house, are you sure ?`,
				cancelText: 'Decline',
				focusOn: 'confirm',
				confirmText: 'Delete',
				type: 'is-danger',
				onConfirm: async () => {
					this.isLoading = true
					try {
						await this.$MyContract.methods.deleteOneHouse(this.HouseID).send({
							from: this.$Web3Eth.defaultAccount
						})
						this.isLoading = false
					} catch (error) {
						console.error(error)
						this.$buefy.toast.open({
							type: 'is-danger',
							message: 'Une erreur s\'est produite'
						})
						this.isLoading = false
					}
				}
			})
		}

		openConfirmDialog() {
			this.$buefy.dialog.confirm({
				title: 'Buy House',
				message: `This house cost ${this.House && this.House.price || 0} Ethereum.
      Are you sur you want spend it ?`,
				cancelText: 'Decline',
				focusOn: 'confirm',
				confirmText: 'Buy',
				type: 'is-success',
				onConfirm: async () => {


					this.isLoading = true

					if (!this.House || !this.House.id) {
						this.$buefy.toast.open({
							type: 'is-danger',
							message: 'No House was found'
						})
						this.isLoading = false
						return
					}


					try {
						await this.changeOwner(this.House.id)
					} catch (error) {
						this.isLoading = false
						this.$buefy.toast.open({
							type: 'is-danger',
							message: error
						})
						return
					}
				},
				onCancel: () => {
					this.isLoading = false
					this.$buefy.toast.open({
						type: 'is-primary',
						message: 'Cancel by user'
					})
					return
				}
			})
		}

		async getHouseById(houseId: string): Promise<any> {
			return await this.$MyContract.methods.getHouse(houseId).call()
		}

		async displayHouse() {
			const house = this.HouseID ? this.dtoHouse(await this.getHouseById(this.HouseID)) : undefined

			// In case of no house was found
			if (!house || house.id === '0' && house.price === 0) {
				this.$buefy.toast.open({ type: 'is-danger', message: 'No House was found' })
				return Promise.reject('No House was found')
			}


			this.isConnected = this.$Web3Eth.defaultAccount !== null
			this.isOwnHouse = house.owner.publicAddress === this.$Web3Eth.defaultAccount

			return house
		}

		async changeOwner(houseId: string): Promise<any> {

			if (!this.House) {
				this.$buefy.toast.open({
					type: 'is-danger',
					message: 'House was not found'
				})
				return Promise.reject('House was not found')
			}

			const price = this.House.price ? this.$Web3.utils.toWei(this.House.price.toString(), 'ether') : undefined

			if (!price) {
				return Promise.reject('Price was not found')
			}

			const currentBalance = this.$Web3.utils.fromWei(await this.$Web3Eth.getBalance(this.$Web3Eth.defaultAccount!))


			if (parseFloat(currentBalance) < this.House.price) {
				return Promise.reject('Your balance is too low')
			}

			await this.$MyContract.methods.setHouseOwner(parseInt(houseId), this.House.owner.publicAddress).send({
				from: this.$Web3Eth.defaultAccount,
				value: price
			})
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
        background: url('../assets/house.jpg');
        background-position: center;
        height: 250px;
        background-size: cover;
    }

    .principale {
        margin-top: 10px;
    }
</style>

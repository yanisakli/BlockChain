<template>
    <div>
        <form>
            <b-field label="Address">
                <b-input v-model="defaultHouse.postalAddress"></b-input>
            </b-field>
            <b-field grouped>
                <b-field expanded label="Size (m2)">
                    <b-select expanded placeholder="Select the size" v-model="defaultHouse.size">
                        <option v-for="size in maxNbSize" :value="size" :key="size">
                            {{ size }}
                        </option>
                    </b-select>
                </b-field>
                <b-field expanded label="Number of bedroom">
                    <b-select expanded placeholder="Number of bedroom" v-model="defaultHouse.nbRoom">
                        <option v-for="nbRoom in maxNb" :value="nbRoom">
                            {{ nbRoom }}
                        </option>
                    </b-select>
                </b-field>
                <b-field expanded label="Number of room">
                    <b-select expanded placeholder="Number of room" v-model="defaultHouse.nbPiece">
                        <option v-for="nbPiece in maxNb" :value="nbPiece">
                            {{ nbPiece }}
                        </option>
                    </b-select>
                </b-field>
            </b-field>
            <b-field expanded grouped>
                <b-field label="Country">
                    <b-select expanded placeholder="Choose your country" v-model="defaultHouse.country">
                        <option v-for="(country, index) in countries" :value="country" :key="index">
                            {{ country }}
                        </option>
                    </b-select>
                </b-field>

                <b-field expanded label="Disponibility">
                    <b-datepicker
                            v-model="defaultHouse.disponibility"
                            icon-pack="far"
                            placeholder="Click to select..."
                            icon="calendar">
                    </b-datepicker>
                </b-field>
            </b-field>
            <b-field label="Price (Ethereum)">
                <b-numberinput icon-pack="fas" v-model="defaultHouse.price"></b-numberinput>
            </b-field>
            <b-button type="is-success" v-on:click="createHouse" expanded>Sell my house</b-button>
        </form>
        <b-loading :is-full-page="true" :active.sync="pageIsLoading" :can-cancel="false"></b-loading>
    </div>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import { HouseWithoutUser } from '@/definitions'

	@Component
	export default class NewHouseFormComponent extends Vue {
		pageIsLoading = false
		maxNb = 4
		maxNbSize = [10, 20, 30, 40, 50, 60]
		defaultHouse: HouseWithoutUser = {
			postalAddress: '27 Rue Lonnesse, 75019 PARIS',
			size: 60,
			price: 50000,
			country: 'France',
			disponibility: new Date('2019/09/29'),
			nbRoom: 4,
			nbPiece: 4
		}

		countries = ['France', 'Spain', 'USA', 'United-kingdoms']

		async mounted() {
			this.$MyContract.events.NewHouse({}, (error: any, data: any) => {
				this.$buefy.toast.open({
					type: 'is-success',
					message: 'Nouvelle maison créé'
				})
			})
		}

		async createHouse() {
			this.pageIsLoading = true
			console.log('this.defaultHouse', this.defaultHouse)
			try {
				this.defaultHouse.disponibility = this.defaultHouse.disponibility.toString()
				await this.$MyContract.methods.createHouse(this.defaultHouse).send({
					from: this.$Web3Eth.defaultAccount
				})

				this.pageIsLoading = false
				await this.$router.push('/')
			} catch (error) {
				console.log(error)
				this.$buefy.toast.open({
					type: 'is-warning',
					message: 'Une erreur s\'est produite',
					duration: 2500
				})
				this.pageIsLoading = false
			}
		}
	}
</script>

<style scoped="scss">

</style>

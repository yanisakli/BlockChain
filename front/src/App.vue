<template>
    <div id="app">
        <div id="navbar">
            <NavbarComponent></NavbarComponent>
        </div>
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
        <footer class="footer">
            <div class="content has-text-centered">
                <p>
                    Made with Love By us.
                    Only for ESGI...
                </p>
            </div>
        </footer>
    </div>
</template>

<script lang="ts">
	import NavbarComponent from '@/components/NavbarComponent.vue'
	import { Component, Vue } from 'vue-property-decorator'

	@Component({
		components: {
			NavbarComponent
		}
	})
	export default class App extends Vue {
		async mounted() {
			console.log('this.$Web3', this.$Web3)
			console.log('this.$Web3Eth', this.$Web3Eth)
			console.log('this.$MyContract', this.$MyContract)

			try {
				const user = await this.$MyContract.methods.getUserByAddress(this.$Web3Eth.defaultAccount).call()
				if (user.publicAddress == '0x0000000000000000000000000000000000000000') {
					this.$buefy.dialog.prompt({
						type: 'is-info',
						message: 'No account was found, please choose your pseudo',
						title: 'Choose your pseudo',
						inputAttrs: {
							placeholder: 'e.g. Walter',
							maxlength: 10
						},
						trapFocus: true,
						onConfirm: async (value) => {
							console.log('this.$Web3Eth.defaultAccount', this.$Web3Eth.defaultAccount)
							console.log('this.$MyContract.methods', this.$MyContract.methods)
							try {
								await this.$MyContract.methods.createUser(value).send({
									from: this.$Web3Eth.defaultAccount
								})
								this.$buefy.toast.open(`Your name is: ${value}`)
							} catch (e) {
								console.log('Error', e)
								this.$buefy.toast.open({
                                  type: "is-danger",
                                  message: "Une erreur est survenu lors de la création du compte"
                                })
							}
						}
					})
					console.log('user', user)
				}

				console.log('user', user)

				const event = await this.$MyContract.events.NewUser()
				event.on('data', (user: any) => {
					console.log('event', user)
				})
			} catch (error) {
				console.log('APP : error', error)
			}
		}
	}
</script>

<style lang="scss">
    @import "~bulma/sass/utilities/_all";

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #navbar {
        height: 52px;
    }

    .component-fade-enter-active, .component-fade-leave-active {
        transition: opacity .3s ease;
    }

    .component-fade-enter, .component-fade-leave-to
        /* .component-fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }

    @import "~bulma";
    @import "~buefy/src/scss/buefy";
</style>

<template>
    <b-navbar class="is-fixed-top">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <b>CoinHouse</b>
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item tag="router-link" :to="{name: 'AppHome'}">
                Home
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{name: 'AppNewHouse'}">
                Share my house
            </b-navbar-item>
        </template>

        <template slot="end">
            <template v-if="$Web3Eth.defaultAccount">
                <b-navbar-item tag="div">
                    <div class="buttons">
                        You are connected has:
                        <strong class="tag">{{ $Web3Eth.defaultAccount }}</strong>
                    </div>
                </b-navbar-item>
            </template>
            <template v-else>
                <b-navbar-item tag="div">
                    <div class="buttons">
                        <b-tag type="is-danger" class="">
                            Vous n'êtes pas encore connecté
                        </b-tag>
                    </div>
                </b-navbar-item>
            </template>
        </template>
    </b-navbar>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"

  @Component
  export default class NavbarComponent extends Vue {
    currentAccount: string | null = null
    mounted() {
      console.log('NavbarComponent : this.$Web3Eth', this.$Web3Eth.defaultAccount)
      this.currentAccount = this.$Web3Eth.defaultAccount
    }
  }
</script>

<style scoped="scss">
    .is-fixed-top {
        z-index: 999 !important;
    }

</style>

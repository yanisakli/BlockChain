<template>
    <b-navbar class="is-fixed-top">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                        src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                        alt="Lightweight UI components for Vue.js based on Bulma"
                >
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
            <b-navbar-item tag="div">
                <div class="buttons">
                    You are connected has:
                    <strong class="tag">0xcfd5c8820d43de0fd9542f8d2d5b6b7fc978f912</strong>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"

  @Component
  export default class NavbarComponent extends Vue {
  }
</script>

<style scoped="scss">
    .is-fixed-top {
        z-index: 9999 !important;
    }

</style>

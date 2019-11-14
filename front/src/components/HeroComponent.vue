<template>
    <div class="hero-body">
        <div class="container">
            <h1 class="title">
                CoinHouse
            </h1>
            <h2 class="subtitle">
                <p>Take & Share your house with Ethereum</p>
                <b-button type="is-success" class="btn-action" tag="router-link" :to="{name: 'AppNewHouse'}">Share house</b-button>
            </h2>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HeroComponent extends Vue {

}
</script>

<style scoped ="scss">
.btn-action {
    margin-top: 1em;
}
</style>

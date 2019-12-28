<template>
    <div id="home">
        <section id="hero" class="hero is-primary">
            <HeroComponent></HeroComponent>
        </section>
        <div class="section">
            <div class="container">
                <h1 class="title has-text-left">Travelling around the world </h1>
                <AppHouse></AppHouse>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HeroComponent from '@/components/HeroComponent.vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import AppHouse from './AppHouse.vue'

@Component({
  components: {
    HeroComponent,
    NavbarComponent,
    AppHouse
  },
})
export default class AppHome extends Vue {}
</script>

<style scoped ="scss">
.houses {
    display: flex;
    flex-wrap: wrap;
}
</style>

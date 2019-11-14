<template>
    <div id="home">
        <section id="hero" class="hero is-primary">
            <HeroComponent></HeroComponent>
        </section>
        <section class="section">
            <div class="container">
                <h1 class="title has-text-left">Travelling around the world </h1>
                <div class="columns houses">
                    <div v-for="(index, i) in 10" :key="index" class="column is-3">
                        <HouseComponent v-bind:key="index"></HouseComponent>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HeroComponent from '@/components/HeroComponent.vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import HouseComponent from '@/components/HouseComponent.vue'

@Component({
  components: {
    HeroComponent,
    NavbarComponent,
    HouseComponent
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

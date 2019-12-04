<template>
    <section class="section">
        <div class="columns">
            <div class="column is-offset-3 is-6 has-text-left">
                <div class="box">
                    <h1 class="title">Create a new house</h1>
                    <h2 class="subtitle">
                        You can set up your own house, set its price and specify its location.
                    </h2>
                    <NewHouseComponent></NewHouseComponent>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
  import NewHouseFormComponent from "../components/NewHouseFormComponent.vue"
  import { Component, Vue } from "vue-property-decorator"

  @Component({
    components: {
      NewHouseComponent: NewHouseFormComponent
    }
  })
  export default class AppNewHouse extends Vue {

  }
</script>

<style scoped="scss">

</style>

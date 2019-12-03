<template>
    <div class="columns houses">
        <template v-if="houses && houses.length > 0">
            <div v-for="(house, index) in houses" :key="index" class="column is-3">
                <HouseComponent v-bind:key="index" :house="house"></HouseComponent>
            </div>
        </template>
        <template v-else>
            <div class="column is-offset-4 is-4">
                <h2 class="subtitle">No House was found</h2>
                <b-button type="is-success" class="btn-action" tag="router-link" :to="{name: 'AppNewHouse'}">Share house</b-button>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HouseComponent from '@/components/HouseComponent.vue'

// TODO faire les appels au contrat

@Component({
  components: {
    HouseComponent
  }
})
export default class AppHouse extends Vue {
  houses: Array<any> = []

  async mounted(){
    try {
      this.houses = await this.getAllHouses()
      console.log('allHouse', this.houses)
    } catch(error) {
      console.log('error', error)
    }
  }
  async getAllHouses() {
    return await this.$MyContract.methods.getAllHouses().call()
  }
}
</script>

<style scoped ="scss">

</style>

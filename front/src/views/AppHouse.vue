<template>
    <div class="columns houses">
        <div v-for="(house, index) in houses" :key="index" class="column is-3">
            <HouseComponent v-bind:key="index" :address="house.postalAddress" :price="house.price" :id="house.id"></HouseComponent>
        </div>
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
      const allHouses = await this.getAllHouses()
      console.log('allHouses', allHouses)
      this.houses = allHouses
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

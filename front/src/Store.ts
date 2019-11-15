import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
import BuyHouse from './core/contract/BuyHouse'
const BuyHouseContract = new BuyHouse()

const store = new Vuex.Store({
  state: {
    defaultAddressKey: null
  },
  mutations: {
    updateAddressKey (state, payload) {
      state.defaultAddressKey = payload
    }
  }
})

export default store

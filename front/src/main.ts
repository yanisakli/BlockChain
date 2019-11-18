import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import Store from './Store'
import BuyHouse from '@/core/contract/BuyHouse'

Vue.config.productionTip = false

const BuyHouseContract = new BuyHouse()

BuyHouseContract.getDefaultAccount().then(defaultAccount => {
  BuyHouseContract.Web3Eth.defaultAccount = defaultAccount
  console.log('MAIN : BuyHouseContract.Web3Eth', defaultAccount)

  Vue.prototype.$Web3 = BuyHouseContract.Web3
  Vue.prototype.$Web3Eth = BuyHouseContract.Web3Eth
  Vue.prototype.$MyContract = BuyHouseContract.MyContract

  Vue.use(Buefy)

  new Vue({
    router,
    store: Store,
    render: (h) => h(App),
  }).$mount('#app')
})

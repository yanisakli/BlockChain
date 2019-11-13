import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BuyHouse from './core/contract/BuyHouse'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.config.productionTip = false

const BuyHouseContract = new BuyHouse()

Vue.prototype.$Web3Eth = BuyHouseContract.Web3Eth.eth
Vue.prototype.$Web3 = BuyHouseContract.Web3Eth
Vue.prototype.$myContract = BuyHouseContract.MyContract

Vue.use(Buefy)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')

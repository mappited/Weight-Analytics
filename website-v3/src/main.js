import { createStore } from 'vuex'
import { createApp } from 'vue'
import App from './App.vue'

import titleMixin from './mixins/titleMixin'

import Home from './Home.vue'
import MobileReg from './MobileReg.vue'
import SecondPage from './SecondPage.vue'

import { createRouter, createWebHistory } from 'vue-router'

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Home },
  { path: '/MobileReg', component: MobileReg },
  { path: '/SecondPage', component: SecondPage },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  history: createWebHistory(),
  routes,
})

const store = createStore({
  state () {
    return {
      count: 1
    }
  }
})

const app = createApp(App)
app.mixin(titleMixin)
app.use(router)
app.use(store)
app.mount('#app')

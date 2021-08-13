import { createApp } from 'vue'
import store from '@/store' // short for @/store/index
import App from './App.vue'
import router from './router' // <---
import { VueCookieNext } from 'vue-cookie-next'
import emitter from 'tiny-emitter/instance'

 createApp(App).use(router).use(store).use(VueCookieNext).provide('emitter', emitter).mount('#app')



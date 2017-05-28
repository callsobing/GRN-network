import Vue from 'vue'
import App from './App.vue'
import Promise from 'promise-polyfill'
import 'whatwg-fetch'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// import VueResource from 'vue-resource'

Vue.use(ElementUI)

if (!window.Promise) {
  window.Promise = Promise
}

new Vue({
  el: '#app',
  render: h => h(App)
})

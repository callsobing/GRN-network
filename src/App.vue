<template>
  <div id="app">

    <resttest id="resttest"></resttest>
    <ring id="ring"></ring>

  </div>
</template>

<script>
import RESTtest from './components/RESTtest.vue'
import Ring from './components/Ring.vue'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    resttest: RESTtest,
    ring: Ring
  }
}
</script>

<style lang="scss">
#app {
  // border: 1px green solid;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#resttest {
  // border: 1px red solid;
  background-color: #EEE;
  position: fixed;
  top: 0;
  left: 0;
  height: 99vh;
  overflow-y: scroll;
  width: 29.5vw;
}

#ring {
  // border: 1px blue solid;
  position: fixed;
  right: 0;
  top: 0;
  height: 99vh;
  width: 69.5vw;
}
</style>

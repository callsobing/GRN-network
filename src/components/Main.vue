<template>
  <div class="main">

    <searchpanel
    v-bind:query='query'
    @newVizTask:query="vizTaskHandler"
    id="searchpanel"
    ></searchpanel>

    <rings
    v-bind:focus='focus'
    @newFatchTask:focus="fatchTaskHandler"
    id="rings"
    ></rings>

  </div>
</template>

<script>
import SearchPanel from '@/components/SearchPanel.vue'
import Rings from '@/components/Rings.vue'

export default {
  name: 'main',
  data () {
    return {
      msg: 'GRN visualization v0.1.0',
      apiURL: '/cors/gene_factor_site/',
      focus: 'T00015',
      query: 'T00015',
      data: null
    }
  },
  components: {
    searchpanel: SearchPanel,
    rings: Rings
  },
  methods: {
    fatchTaskHandler (payload) {
      console.log('[Main] fatchTaskHandler(): ', payload['AC'])
      this.query = payload['AC']
    },
    vizTaskHandler (payload) {
      console.log('[Main] vizTaskHandler: ', payload['AC'])
      this.focus = payload['AC']
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#searchpanel {
  /*border: 1px red solid;*/
  background-color: #EEE;
  position: fixed;
  top: 0;
  left: 0;
  height: 99vh;
  width: 29.5vw;
}

#rings {
  /*border: 1px blue solid;*/
  position: fixed;
  right: 0;
  top: 0;
  height: 99vh;
  width: 69.5vw;
  padding-top: 1rem;
}

#focus {
  z-index: 2000;
}

a {
  color: #42b983;
}
</style>

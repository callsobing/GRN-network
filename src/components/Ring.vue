<template lang="html">
  <div class="ring">

    <div id="box">
      <input v-model="focus" list="hints">
      <datalist id="hints">
        <option v-for="id in matchedIds(15)" :value="id">(name)</option>
      </datalist>
      <button @click="redraw(focus)">Go</button>
      <!-- <img src="../assets/logo.png" alt=""> -->
      <!-- <p><code><b>viz</b></code>: {{ viz }}</p> -->
    </div>
    <div id="canvas"></div>

  </div>
</template>

<script>
export default {
  name: 'ring',
  data () {
    return {
      viz: {},
      focus: 'T00015',
      hints: []
    }
  },
  computed: {
    node_file_path: () => require('../assets/id_2prop.tsv'),
    edge_file_path: () => require('../assets/GRNv1.0.0.tsv'),
    hint_file_path: () => require('../assets/id.tsv')
  },
  mounted () {
    this.init_draw()
    this.init_autocomplete()
  },
  methods: {
    init_draw () {  
      let vm = this
      d3.tsv(vm.node_file_path, function(nodes){
        
        d3.tsv(vm.edge_file_path, function(edges){
          console.log('** edges: ', edges)
          console.log('** nodes: ', nodes)

          let visualization = d3plus.viz()
          .id("id")                        // set id to match on nodes
          .attrs(nodes)                    // attrs e.g. names, colors etc.
          .container("#canvas")            // container DIV to hold the viz
          .type("rings")                   // visualization type
          .focus("T00015")                 // center node on Beyonce
          .text("id")                      // set text to display on nodes
          .edges({
            "value": edges,                // set data for edges (default)
            "label": "strength",           // edge labels
            // "size": "strength",         // edge thickness
            "arrows": true                 // show directional arrows
          })
          .tooltip(['name', 'organism'])
          .mouse({
            "click": function(data, viz) {
              console.log("[clicked] data:", data)
              console.log("[clicked] viz:", viz)
              viz.focus(data.id).draw()
            }
          })
          .draw(() => console.log('Started Drawing!'))
          vm.viz = visualization
        })
      })
    },
    handleClick (data, viz) {
      console.log(data)
      return viz
    },
    redraw (focus_node) {
      this.viz.focus(focus_node).draw()
    },
    init_autocomplete () {
      d3.tsv(this.hint_file_path, (id) => {
        this.hints = id.map(o => o.id)
      })
    },
    matchedIds (max) {
      return this.hints
        .filter((id) => id.indexOf(this.focus) !== -1)
        .slice(0, max)
        .filter((item, pos, self) => self.indexOf(item) == pos)
    }
  }
}
</script>

<style lang="css" scoped>
.ring {
  /*border: 1px green solid;*/
}

#viz {
  /*border: 1px grey solid;*/
  position: inherit;
  top: 10;
  bottom: 0;
  z-index: -999;
}

#box {
  /*border: 1px grey solid;*/
  margin: 0.5em;
  z-index: 999;
}
</style>

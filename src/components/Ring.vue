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
      node_file: '/static/id_2prop.csv',
      edge_file: '/static/GRNv1.0.0.csv',
      hint_file: '/static/id.tsv',
      hints: []
    }
  },
  mounted () {
    this.init_draw()
    this.init_autocomplete()
  },
  methods: {
    init_draw () {
      let vm = this
      d3.tsv('./static/id_2prop.tsv', function(nodes){
        // console.log('** nodes: ', nodes);
        d3.tsv('./static/GRNv1.0.0.tsv', function(edges){
          // console.log('** edges: ', edges);

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
          .draw(() => console.log('Started Drawing!'))
          vm.viz = visualization
        })
      })
    },
    redraw (focus_node) {
      this.viz.focus(focus_node).draw()
    },
    init_autocomplete () {
      d3.tsv(this.hint_file, (id) => {
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

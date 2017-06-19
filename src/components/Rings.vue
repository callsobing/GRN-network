<template>
  <div class='rings'>

    <div id="canvas"></div>

  </div>
</template>

<script>
import * as d3 from 'd3'
import d3plus from 'd3plus'

export default {
  name: 'rings',
  data () {
    return {
      msg: 'Rings.vue',
      viz: d3plus.viz()
    }
  },
  mounted () {
    // mounted之後DOM才有#canvas元素
    this.init_draw()
  },
  props: ['focus'],
  watch: {
    // Redraw upon `focus` changed
    focus: function (val, oldVal) {
      this.viz.focus(val).draw(() => console.log('[Rings] Fetched, redrawing!' + val))
    },
    viz: function (val, oldVal) {
      this.$message.error(oldVal)
      this.$message.error(val)
    }
  },
  methods: {
    init_draw () {
      d3.tsv('/static/GRNv1.0.0.tsv', (edges) => {
        // console.log('[Rings] init_draw()', edges[0], edges)
        this.viz
        .id('id')
        .container('#canvas')
        .type('rings')
        .text('id')
        // .edges('https://www.dropbox.com/s/ovret2tir3ywifu/GRNv1.0.0.tsv')
        .edges({
          'value': edges,
          'label': 'strength',
          'arrow': true
        })
        .focus(this.focus)
        .mouse({'click': this.nodeClickedHandler})
        .draw(() => console.log('[Rings] Started Drawing!'))
      })
    },
    nodeClickedHandler (data, viz) {
      this.viz.focus(data.id).draw(() => console.log('[Rings] Clicked, redrawing!' + data.id))
      this.$emit('newFatchTask:focus', { AC: data.id })
    }
  }
}
</script>

<style lang='css' scoped>
.rings {
  /*border: 1px green solid;*/
}

#viz {
  /*border: 1px grey solid;*/
  position: inherit;
  top: 10;
  bottom: 0;
  z-index: -999;
}
</style>

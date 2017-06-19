<template>
  <div class="searchpanel">

    <!-- 搜尋框（綁定`query`） -->
    <el-input
      v-model="inputValue"
      icon="search"
      :on-icon-click="handleIconClick"
      v-loading.body="isLoading"
      ></el-input>

    <!-- <searchbox></searchbox> -->

    <!-- 表格（綁定`record`） -->
    <template>
      <el-table
        :data="record"
        :show-header="false"
        :height="0.8 * vh"
        :empty-text="'No result for ' + query"
        style="width: 100%"
        >
        <el-table-column prop="key" label="屬性" width="80px"></el-table-column>
        <el-table-column prop="val" label="值" min-width="200px"></el-table-column>
      </el-table>
    </template>

  </div>
</template>

<script>
import 'whatwg-fetch'
import _ from 'lodash'
import SearchBox from '@/components/SearchBox.vue'

export default {
  name: 'searchpanel',
  data () {
    return {
      msg: 'GRN visualization v0.1.0',
      apiURL: '/cors/gene_factor_site/',
      data: null,
      isLoading: false,
      inputValue: ''
    }
  },
  props: ['query'],
  watch: {
    // Fetch new record upon `query` changed
    query: function (val, oldVal) {
      this.inputValue = val
      this.fetchGeneInfo(this.inputValue)
    }
  },
  created () {
    this.inputValue = this.query
    this.fetchGeneInfo(this.inputValue)
  },
  computed: {
    // query: () => this.query,
    record () {
      return _.filter(
              _.mapValues(this.data, (v, k) => ({key: k, val: String(v).split('##')})),
            (field) => field.key !== '_id')
    },
    vh () {
      return window.innerHeight
    }
  },
  methods: {
    handleIconClick (event) {
      if (!this.data || this.data['AC'] !== this.inputValue) {
        this.fetchGeneInfo(this.inputValue)
        this.$emit('newVizTask:query', { AC: this.inputValue })
      }
    },
    fetchGeneInfo (ac) {
      this.isLoading = true
      this.inputValue = ac
      let task = fetch(this.apiURL + ac)
      task
      .then((res) => {
        this.isLoading = false
        if (res.ok) {
          res.json().then((body) => {
            if (body) {
              this.data = body
              console.log('[SearchPanel] Fetched: ', body)
              // this.$emit('newVizTask:query', { AC: body['AC'] })
              console.log('[SearchPanel] newVizTask: ', body['AC'])
            } else {
              this.$message({message: 'Empty body!', type: 'warning'})
            }
          })
        } else if (res.status === 404) {
          this.data = null
          console.log('[SearchPanel] 404 Not Found:', ac)
        } else {
          this.data = null
          this.$message({message: 'Fetch failed!' + res.status, type: 'warning'})
        }
      })
      .catch((e) => {
        this.data = null
        this.$message({message: 'Error! ' + e.message, type: 'warning'})
        console.log('[SearchPanel] Fetch failed!', e.message)
        this.isLoading = false
      })
    }
  },
  components: {
    searchbox: SearchBox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.searchpanel {
  position: absolute;
  width: 100%;
  height: 100%;
}

.el-input {
  max-width: 15rem;
  margin-top: 0.5rem;
}

.el-table {
  position: absolute;
  height: unset !important;
  top: 3.5rem !important;
  /*top: 8.5rem !important;*/
  bottom: 0px !important;
  border: 0px;
}
</style>

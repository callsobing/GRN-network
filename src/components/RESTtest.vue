<template lang="html">
  <div class="resttest">

    <el-input v-model="ac" placeholder="e.g. G000001" style="width:150px;margin:0.5em;"></el-input>
    <!-- <el-button @click="getGeneInfo(ac)">getGeneInfo</el-button> -->
    <el-button @click="fetchGeneInfo(ac)">fetchGeneInfo</el-button>

    <!-- <tempate>
      <el-table :data="recordArr" border style="width: 30%" max-height="400">
        <el-table-column fixed prop="'k'" label="屬性" width="80"></el-table-column>
        <el-table-column prop="'v'" label="值" min-width></el-table-column>
      </el-table>
    </tempate> -->

    <table>
    <template v-for="key in Object.keys(record)">
      <tr>
        <td><b>{{ key }}</b></td>
        <td>{{ record[key] }}</td>
      </tr>
      </template>
    </table>

  </div>
</template>

<script>
import 'whatwg-fetch'
export default {
  name: 'resttest',
  data () {
    return {
      title: 'DBtest.vue',
      ac: 'G000001',
      apiUrl: 'http://140.112.94.72/nodejsAppli/gene/',
      record: {k: 'NA', v: 'NA'}
    }
  },
  created () {
    this.fetchGeneInfo(this.ac)
  },
  methods: {
    // Fetch (XMLhttpRequest)
    fetchGeneInfo (ac) {
      let self = this
      fetch(self.apiUrl + self.ac, {
        method: 'get'
        // mode: 'no-cors'
      }).then((res) => {
        // res instanceof Response == true.
        if (res.ok) {
          res.json().then((body) => {
            if (body) {
              self.record = body
              console.log('*** Fetched response body: ', body)
            } else {
              self.record = null
              console.log('*** No match for' + self.ac)
            }
          })
        } else { console.log('*** Looks like the response wasn\'t perfect, got status', res.status) }
      }, (e) => { console.log('*** Fetch failed!', e) })
    },
    toKvList (obj) {
      let arr = []
      for (let key in obj) {
        arr.push({ k: key, v: obj[key] })
      }
      return arr
    }
    // vue-resource way
    // getGeneInfo (ac) {
    //   this.$http.get(this.apiUrl, {headers: {'Access-Control-Allow-Origin': true}})
    //     .then((res) => {
    //       console.log(res)
    //       this.$set('record', res.data)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
  },
  computed: {
    recordArr () {
      return this.toKvList(this.record)
    }
  }
}
</script>

<style lang="css">
.resttest {

}

table {
  margin: 0.5em;
}

tr, td {
  border-bottom: 1px solid #BBB;
}
</style>

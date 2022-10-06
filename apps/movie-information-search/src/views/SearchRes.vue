<template>
  <div class='page-res'>
    <div class="reschart">
      <!-- <keep-alive> -->
      <div v-if="!flag" style="text-align:center">
        <h1>正在搜索中......</h1>
      </div>
      <chart :rdf="rdfdata" v-if="flag"></chart>
      <!-- v-on:childmessage="changesummary" :centersearch="search" -->
      <!-- </keep-alive> -->
    </div>
    <!-- <div class="reslist">
      <p>{{summary}}</p>
      <div v-for="item in text" :key="item.index">
        <p>{{item}}</p>
      </div>
    </div> -->
  </div>
</template>

<script>
  import vue from 'vue'
  import {mapMutations} from 'vuex'
  import chart from '@/components/chart.vue'

  export default {
    data: () => ({
      rdfdata: [],
      flag: false,
      search: '',
      searchStyle: ''
    }),
    components: {
      chart
    },
    methods: {
      //changesummary(data) {
      //   console.log('father')
      //   if(data.click == true){
      //     vue.axios.get('http://editme.top:8001/api/v3/movie/', {
      //       params: {
      //         id: data.id
      //       }
      //     }).then(response => {
      //       this.summary1=response.data;
      //     }).catch(error => {
      //       console.log(error)
      //     })
      //   }else{
      //     vue.axios.get('http://editme.top:8001/api/v3/person/', {
      //       params: {
      //         id: data.id
      //       }
      //     }).then(response => {
      //       this.summary1=response.data;
      //     }).catch(error => {
      //       console.log(error)
      //     })
      //   }
      //}
    },
    computed: {
      // summary : function(){
      //   if(this.summary1!=undefined){
      //     return this.summary1.summary;
      //   }else{
      //     return ' ';
      //   }
      // }
    },
    mounted() {//根据home页面传来的值进行搜索
      this.search = this.$route.params.searchText || this.$store.state.UserState.currentSearchText
      this.searchStyle = this.$route.params.searchStyle || this.$store.state.UserState.searchStyle
      if (this.searchStyle == '2') {//智能问答
        var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/subject/smart_search/'
        this.api.get(PostUrl, {
          query: this.search
        }).then(response => {
          if (response.status === 200 && response.data != "I don't understand") {
            this.rdfdata.push(response.data[0]);
            this.flag = true
          } else{
            this.$message.error("小神知识库有限，I don't understand");
            this.flag = false
            this.$router.push({name: 'home'})
          }
        })
      } else {//知识图谱
        var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/subject/search/'
        this.api.get(PostUrl, {
          name: this.search
        }).then(response => {
          console.log(response.data)
          if (response.status === 200 && response.data[0] != undefined) {
            this.rdfdata.push(response.data[0]);
            this.flag = true
          } else {
            this.$message.error("小神知识库有限，I don't understand");
            this.flag = false
            this.$router.push({name: 'home'})
          }
        })
      }
    }
  }

</script>

<style lang="stylus">
  .page-res
    display flex
    flex-direction row

    .reschart
      width 100%

</style>

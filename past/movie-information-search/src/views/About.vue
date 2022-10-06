<template>
  <div class="about">
    <h1>圈子里的那点事</h1>
    <aboutList :dataList="aboutLists"></aboutList>
  </div>
</template>
<script>
  import aboutList from '@/components/aboutList.vue'

  export default {
    components: {
      aboutList
    },
    data() {
      return {
        aboutLists: [],
        start: 0
      }
    },
    mounted() {
      this.getFeedsList()
    },
    methods: {
      getFeedsList() {
        var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/feeds'
        this.api.get(PostUrl, {
          token: this.$store.state.UserState.token,
          start: this.start,
          end: this.start+5
        }).then(response => {
          if (response.status === 200) {
            this.aboutLists = response.data
          } else {
            this.$message.error(JSON.stringify(response.statusMessage));
          }
        })
      }
    }
  }
</script>
<style lang="stylus">
  body
    margin 0px

  .about
    padding 0 40px
    height 92vh
    overflow hidden
</style>
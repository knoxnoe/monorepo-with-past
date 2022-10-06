<template>
    <div class="list-noe-about" ref="container">
      <div class="list" ref="inner">
        <el-card v-for="(item,index) in list" v-bind:key="index" class="list-card"  shadow="hover">
            <div slot="header" class="clearfix">
                <span class="text">{{ item.created_date.substr(0,10)}}</span>
                <span class="text" @click="goSubUser(item.user.username)">{{'  |  '+item.user.username+'  |  '}}</span>
                <span v-if="item.movie == null" class="text">{{'无电影文章'}}</span>
                <span v-else class="text">{{'电影：'+item.movie.title}}</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="collect(item.article_id)">收藏文章</el-button>
            </div>
            <div class="text item">
              <p>{{'动态内容 ' + item.content }}</p>
              <img v-if="item.movie != null" :src="'http://movie.sqy.xyz/image/movie/'+(item.movie.id%109)+'/'+(item.movie.id)+'.jpg'" alt="">
              <div class="movieDetail">
                <div v-if="item.movie != null">
                  <p>{{'电影名：'+item.movie.title}}</p>
                  <p>{{'标签：'+item.movie.genres}}</p>
                  <p>{{'年份：'+item.movie.year}}</p>
                  <p>{{'评分：'+ item.movie.rating}}</p>
                  <p>{{'概述：'+item.movie.summary}}</p>
                </div>
                <!-- <el-link @click="goArticle(item.article_id)">查看全文<i class="el-icon-view el-icon--right"></i></el-link> -->
              </div>
            </div>
          </el-card>
        <div class="loadmore" ref="loading">
          <span>已经没了</span>
        </div>
      </div>
      <el-dialog
        title="添加收藏夹"
        :visible.sync="collectDialogVisible"
        width="70%"
        center>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city.id" :key="city.id">{{city.name}}</el-checkbox>
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
          <el-button @click="collectDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmCollect">确认收藏</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<script>
let timer = 0
let lastTime
export default {
  name: 'aboutList',
  props:{
    dataList: ''
  },
  data () {
    return {
      listStyle: true,
      collectDialogVisible: false,
      collectId: null,
      collections: '',
      checkAll: false,
      checkedCities: [],
      cities: '',
      isIndeterminate: true,
      start: 5
    }
  },
  computed:{
    list: {
      get:function(){
        return this.dataList
      },
      set:function(){
        
      }
    }
  },
  mounted(){
    this.list = this.dataList
    this.$refs.container.addEventListener('scroll', this.scroll)
  },
  methods:{
    scroll() {
      let top = this.$refs.container.scrollTop
      let vh = document.body.clientHeight
      let height = this.$refs.loading.offsetTop
      let dis = height - vh - top
      lastTime = new Date()
      var time = lastTime - timer
      if(-100 < dis && dis < 100 && time > 4000){
        timer = new Date()
        var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/feeds'
        this.api.get(PostUrl, {
          token: this.$store.state.UserState.token,
          start: this.start,
          end: this.start+5
        }).then(response => {
          if (response.status === 200) {
            for(var i in response.data){
              this.list.push(response.data[i])
            }
            this.start+=5
          } else {
            this.$message.error(JSON.stringify(response.statusMessage));
          }
        })
      }
    },
    collect(article_id){//收藏
      this.collectId = article_id
      this.collectDialogVisible = true
      this.getListOfBookMark()
    },
    getListOfBookMark(){//挂在组件将请求的数据初始化
        var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/collections/'
        this.api.get(PostUrl,{
            token: this.$store.state.UserState.token
        }).then(response => {
          console.log(response)
          if(response.status == 200){
            if(response.data.length>0){
              this.cities = response.data
            }else{
               this.$message.warning('你还没有收藏夹，请先创建收藏夹！');
            }
          }else{
           this.$message.error(JSON.stringify(response.statusMessage));
          }
      })
    },
    handleCheckAllChange(val) {
      var array = []
      for( var item in this.cities){
        array.push(this.cities[item].id)
      }
      this.checkedCities = val ? array : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    confirmCollect(){
      for(var i=0;i<this.checkedCities.length;i++){
        var current = this.checkedCities[i]
        var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/collection/'+current+'/collect/'+this.collectId+'/'
        this.api.post(PostUrl,{
          token: this.$store.state.UserState.token,
          article_id: this.collectId,
          collection_id: current
        }).then(response => {
          console.log(response)
          if(response.status == 200){
            this.collectDialogVisible = false
            this.$message({
              message: '收藏成功！',
              type: 'success'
            });
          }else{
            this.$message.error(JSON.stringify(response.statusMessage));
          }
        })
      }
    },

    goSubUser(user){//去个人首页
      this.$router.push({name: 'subBookMark', params: {targetName: user}})
      this.$cookie.set('subName', user, 1)
    },
    goArticle(articleId){//去正文
      console.log(articleId)
      var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/read/' + articleId +'/'
      this.axios.post(PostUrl,{
        token: this.$store.state.UserState.token,
        article_id: articleId
      }).then(response => {
        console.log(response)
        response = response.data;
        if(response.status == 200){

        }else{
           this.$message.error(JSON.stringify(response.statusMessage));
        }
      })
      this.$router.push({name: 'article'})
    },
    getListOfBookMark(){//挂在组件将请求的数据初始化
        var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/collections/'
        this.api.get(PostUrl,{
            token: this.$store.state.UserState.token
        }).then(response => {
          console.log(response)
          if(response.status == 200){
            if(response.data.length>0){
              this.cities = response.data
            }else{
               this.$message.warning('你还没有收藏夹，请先创建收藏夹！');
            }
          }else{
           this.$message.error(JSON.stringify(response.statusMessage));
          }
      })
    },
  }
}
</script>
<style lang="stylus">
body
  margin 0
.users
  margin-left 20px
.list-noe-about
    height 100%
    overflow scroll
    &::-webkit-scrollbar
        display none
		.list
  		height 100%
      margin-bottom 100px
			.list-card
				margin-top 20px
				.el-card__header
					cursor pointer
					.clearfix
						.text
							color: #666666
							&:hover
								color: blue
				.el-card__body
					overflow hidden
					.movie_person
						cursor pointer
					img
						float left
						margin-right 20px
			.loadmore
				text-align center
				height 150px

</style>

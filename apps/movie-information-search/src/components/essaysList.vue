<template>
    <div class="list-noe-essay" ref="container2">
      <div class="list" ref="inner">
        <el-card v-for="(item,index) in list" v-bind:key="index" class="list-card"  shadow="hover">
            <div slot="header" class="clearfix">
                <span class="text">{{ item.created_date.substr(0,10)}}</span>
                <span class="text" @click="goSubUser(item.user.username)">{{'  |  '+item.user.username+'  |  '}}</span>
                <span v-if="item.movie == null" class="text">{{'无电影文章'}}</span>
                <span v-else class="text">{{'电影：'+item.movie.title}}</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="uncollect(item.article_id,index)">取消收藏</el-button>
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
                <!-- <div @click="goArticle(item.article_id)">
                  <el-link>查看全文<i class="el-icon-view el-icon--right"></i></el-link>
                </div> -->
              </div>
            </div>
          </el-card>
      </div>
    </div>
</template>
<script>
export default {
  name: 'findList',
  props:{
    dataList: '',
    activeCollection: ''
  },
  data () {
    return {
      listStyle: true,
      start: 5,
      articleId: '',
      index: ''
    }
  },
  computed:{
    list: {
      get:function(){
        return this.dataList
      },
      set:function(){
        
      }
    },
    collectionId: {
      get:function(){
        return this.activeCollection
      },
      set:function(){
        
      }
    }
  },
  mounted(){
    this.list = this.dataList
    this.collectionId = this.activeCollection
  },
  methods:{
    goSubUser(user){//去个人首页
      this.$router.push({name: 'subBookMark', params: {targetName: user}})
      this.$cookie.set('subName', user, 1)
    },
    uncollect(article_id,index){
        this.articleId = article_id
        this.index = index
        this.$confirm('此操作将永久移除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.confirmUncollect()
        })
    },
    confirmUncollect(){
        var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/collection/'+this.collectionId+'/uncollect/'+this.articleId+'/'
        this.api.post(PostUrl,{
          token: this.$store.state.UserState.token,
          article_id: this.articleId,
          collection_id: this.collectionId
        }).then(response => {
          console.log(response)
          if(response.status == 200){
            this.list.splice(this.index,1)
            this.$message({
              message: '已从收藏夹移除！',
              type: 'success'
            });
          }else{
            this.$message.error(JSON.stringify(response.statusMessage));
          }
        })
    }
  }
}
</script>
<style lang="stylus">
body
  margin 0
.users
  margin-left 20px
.list-noe-essay
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

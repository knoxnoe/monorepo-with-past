<template>
  <div class="concern">
    <div class="recommandUser">
      <!-- 推荐关注 -->
      <h2>与你匹配率较高的用户</h2>
      <el-row>
        <el-col class="noe_card_recommd" :span="3" v-for="(o, index) in recommends" :key="index"
                :offset="index%6 == 0 ? 0 : 1">
          <el-card shadow="hover" :body-style="{ padding: '0px' }">
            <div class="avatar">
              <div class="avatar_img">
                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                     class="image">
              </div>
            </div>
            <div class="op">
              <p>{{'昵称：'+o.user.username}}</p>
              <el-button type="text" class="get_followee" @click="followOne(o.user.username)">关注 TA</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="followUser">
      <h2>我关注的用户</h2>
      <el-row>
        <el-col class="noe_card_follow" :span="4" v-for="(o, index) in followee" :key="index"
                :offset="index%4 == 0 ? 0 : 2">
          <el-card shadow="hover" :body-style="{ padding: '0px' }">
            <div class="avatar">
              <div class="avatar_img">
                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                     class="image">
              </div>
            </div>
            <div class="op" style="padding: 14px;">
              <p>昵称：{{ o.username }}</p>
              <p>发表文章数：{{ o.article_count }}</p>
              <div class="bottom clearfix">
                <time class="time"></time>
                <!-- <el-button type="text" class="get_followee" @click="getOtherFollowee">他的关注</el-button> -->
                <el-button type="text" class="get_article" @click="getOtherArticles(o.username)">他的文章</el-button>
                <el-button type="text" class="unfollow" @click="unFollow(o.username,index)">取消关注</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        currentDate: new Date(),
        followee: [],
        recommends: []
      };
    },
    mounted() {
      this.getRecommends()
      this.getFollowees()
    },
    methods: {
      followOne(name) {
        var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/follow/' + name + '/'
        this.api.post(PostUrl, {
          token: this.$store.state.UserState.token,
          followee_name: name
        }).then(response => {
          console.log(response)
          if (response.status === 200) {
            this.getFollowees()
            this.getRecommends()
          } else {
            this.$message.error(JSON.stringify(response.statusMessage));
          }
        })
      },
      getRecommends() {
        var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/recommend/user/'
        this.api.get(PostUrl, {
          token: this.$store.state.UserState.token
        }).then(response => {
          if (response.status === 200) {
            this.recommends = response.data
          } else {
            this.$message.error(JSON.stringify(response.statusMessage));
          }
        })
      },
      getFollowees() {//获取关注人列表
        var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/user/' + this.$store.state.UserState.username + '/followee/'
        this.api.get(PostUrl, {
          username: this.$store.state.UserState.username,
          start: 0,
          end: 20
        }).then(response => {
          console.log(response)
          if (response.status === 200) {
            this.followee = response.data
          } else {
            this.$message.error(JSON.stringify(response.statusMessage));
          }
        })
      },
      // getOtherArticles() {//获取某人文章
      //   var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/user/' + this.$store.state.UserState.username + '/articles/'
      //   this.api.get(PostUrl, {
      //     username: this.$store.state.UserState.username,
      //     start: 0,
      //     end: 20
      //   }).then(response => {
      //     if (response.status === 200) {
      //     } else {
      //       this.$message.error(JSON.stringify(response.statusMessage));
      //     }
      //   })
      // },
      getOtherFollowee() {//获取某人关注

      },
      unFollow(targetName,index) {
        this.$confirm('确认是否取消关注此人, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '取消关注成功!'
          });
          var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/unfollow/' + targetName + '/'
          this.api.post(PostUrl, {
            followee_name: targetName,
            token: this.$store.state.UserState.token
          }).then(response => {
            if (response.status === 200) {
              this.followee.splice(index,1)
            } else {
              this.$message.error(JSON.stringify(response.statusMessage));
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      getOtherArticles(username){
        this.$router.push({name: 'subBookMark', params: {targetName: username}})
        this.$cookie.set('subName', username, 1)
      }
    }
  }
</script>
<style lang="stylus">
  .concern
    .followUser
      padding-left 4%

      .noe_card_follow
        margin-top 20px

        .avatar
          width 100%

          .image
            width 50%
            border-radius 50%
            margin 30px auto 0
            display block

        .op
          text-align center

    .recommandUser
      padding-left 4%

      .noe_card_recommd
        margin-top 20px

        .avatar
          width 30%
          display inline-block

          .image
            width 75%
            border-radius 50%
            margin-left 25%
            margin-top 20px
            display block

        .op
          width 68%
          display inline-block
          padding-left 2%
          vertical-align middle
          overflow hidden

          p
            height 20px
</style>

<template>
  <div id="noe-repo-list">
    <div class="infinite-list-wrapper" style="overflow:auto">
      <ul
              class="list"
              v-infinite-scroll="load"
              infinite-scroll-disabled="disabled"
              infinite-scroll-distance=20>
        <li v-for="(con, i) in repolist" v-bind:key="i" class="list-item">
          <div class="left">
            <p class="repo-name" @click="enterRepo(con.reponame)">{{con.reponame}}</p>
            <p class="repo-desc">{{con.description}}</p>
            <p><span></span><i class="el-icon-share"></i><span>2</span></p>
          </div>
          <div class="right">
            <el-button :type="star()" icon="el-icon-star-off" @click="forkrepo(con.reponame)">fork</el-button>
            <el-button :type="star()" icon="el-icon-star-off">star</el-button>
          </div>
        </li>
      </ul>
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { fork } from "@/api/repository";
  import QS from 'qs'
  export default {
    props: {
      repolist: {
        type: Array,
        required: true
      }
    },
    name: "RepoList",
    data () {
      return {
        count: 10,
        loading: false,
        isstar: "warning"
      }
    },
    computed: {
      noMore () {
        return this.count >= 20
      },
      disabled () {
        return this.loading || this.noMore
      }
    },
    methods: {
      load () {
        this.loading = true
        setTimeout(() => {
          this.count += 2
          this.loading = false
        }, 2000)
      },
      star () {
        return this.isstar;
      },
      enterRepo(reponame) {
        const nickname = this.$store.state.loginState.username || Vue.ls.get('username');
        this.$router.push({
          path: '/repodetail/',
          query: {
            username: nickname,
            reponame: reponame
          }
        })
      },
      forkrepo(reponame) {
        let [,, targetname] = this.$route.path.split('/');
        //const nickname = this.$store.state.loginState.username || Vue.ls.get('username');
        const param = {
          nickname: targetname,
          reponame: reponame
        }

        const params = QS.stringify(param)

        fork(params)
          .then(res => {
            this.$notify({
              title: '成功',
              message: '已成功fork',
              type: 'success'
            })
          })
      }
    }
  }
</script>

<style scoped>
.list {
  padding: 0px 30px;
}
.list-item {
  list-style: none;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed #000;
  padding: 20px 10px;
}
.list-item .right {
  height: 85px;
  line-height: 85px;
}
.list-item .left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.list-item .repo-name {
  font-size: 1.5rem;
  cursor: pointer;
}
.list-item .repo-name:hover {
  color: darkred;
}
.list-item .repo-desc {
  width: 400px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 0.8rem;
  color: gray;
}



{

}
</style>
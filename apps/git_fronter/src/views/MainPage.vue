<template>
  <div id="mainPage">
    <div class="repos">
      <div class="user">
        <div class="avator">
          <div class="img">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          </div>
          <el-dropdown>
            <span class="el-dropdown-link">
              knoxnoe<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>新组织</el-dropdown-item>
              <el-dropdown-item>fasdf</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="repo-list">
          <div class="title">

          </div>
          <div class="lists">
            <ul>
              <li>仓库1</li>
              <li>仓库1</li>
              <li>仓库1</li>
              <li>仓库1</li>
              <li>仓库1</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="messages">
      <div class="infinite-list-wrapper" style="overflow:auto">
        <ul class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
          <li v-for="(id, i) in count" v-bind:key="id" class="list-item">{{ i }}</li>
        </ul>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainPage",
  data () {
    return {
      count: 10,
      loading: false
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
    }
  }
}
</script>

<style scoped>

#mainPage {
  display: flex;
  flex-flow: row;
}
.repos {
  flex-grow: 1;
  padding: 0 20px;
}
.avator {
  margin: 0 auto;
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: center;
}
.avator .img {
  width: 50px;
}



.messages {
  flex-grow: 5;
  background-color: blue;
}


</style>
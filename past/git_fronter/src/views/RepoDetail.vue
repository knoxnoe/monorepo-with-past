<template>
  <div id="repo-detail">
    <div class="head">
      <div class="repo-name">
        <el-container class="title">
          <i class="el-icon-collection"></i>
          <p>{{this.username}}<span>/{{this.reponame}}</span></p>
        </el-container>
      </div>
      <div class="info" @click="enterDeep">
        <el-container>
          <i class="el-icon-delete"></i>
          <el-container icon="el-icon-search" >UnWatch</el-container>
          <i class="el-icon-share"></i>
          <el-container icon="el-icon-search">Star</el-container>
          <i class="el-icon-share"></i>
          <el-container icon="el-icon-search">fork</el-container>
        </el-container>
      </div>
    </div>
    <div class="tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Code" name="first">
          <Code v-bind:fdir="fdir" v-bind:ffile="ffile"></Code>
          <div class="md-edit">
            <MdEditor></MdEditor>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Issues" name="second"></el-tab-pane>
        <el-tab-pane label="Pull requests" name="third"></el-tab-pane>
        <el-tab-pane label="Settings" name="fourth"></el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
import Code from '@/components/RepoDetail/Code.vue'
import MdEditor from '@/components/MdEditor.vue'
import QS from 'qs'
import { getDirectory } from "../api/repository";

export default {
    inject: ['reload'],
    name: 'RepoDetail',
    components: {
        Code, MdEditor
    },
    data() {
      return {
        activeName: 'first',
        username: '',
        reponame: '',
        fdir: [],
        ffile: []
      }
    },
    created() {
      console.log(this.$route.path);
      console.log(this.$route.query);
      this.username = this.$route.query.username;
      this.reponame = this.$route.query.reponame;

      const path = this.$route.path
      let newPath = this.getPath(path);
      console.log(newPath)
      getDirectory(newPath)
        .then(res => {
          console.log(res)
          this.ffile = res.data.files;
          this.fdir = res.data.directories;
          console.log(this.ffile)
          console.log(this.fdir)
        })
    },
    methods: {
      handleClick() {

      },
      getPath(path) {
        let [, , ...strs] = path.split('/');
        let newPath = ['', this.username, this.reponame, ...strs].join('/');
        return newPath;
      },
      enterDeep() {
        this.$router.push({
          path: '/repodetail/target',
          query: {
            username: this.$route.query.username,
            reponame: this.$route.query.reponame
          }
        })
        this.reload()
      }
    }
}

</script>

<style scoped>
#repo-detail {
  padding: 0 50px;
}

.head {
  display: flex;
  justify-content: space-between;
}
.repo-name .title {
  font-size: 1.5rem;
  align-items: baseline;
}

.md-edit {
  padding: 20px;
}

{}
</style>
<template>
  <div id="home" class="home">
    <div class="profile">
      <el-card :body-style="{ padding: '0px' }">
        <img src="https://zijieke.com/semantic-ui/images/avatar2/large/kristy.png" class="image">
        <div style="padding: 14px;">
          <span class="realname">用户名: <span>{{realname}}</span></span>
          <div class="bottom clearfix">
            <p><i class="el-icon-s-custom"></i><span>1</span><span>follower</span><span>1</span><span>following</span></p>
            <el-button class="button" type="info" plain>Edit profile</el-button>
            <time class="time">{{ currentDate }}</time>
          </div>
        </div>
      </el-card>
    </div>
    <div class="repos">
      <div class="tabs">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="Overview" name="second">
            <div class="card-repos">
              <el-row v-for="o in 2" :key="o">
                <el-col :span="10" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span>仓库{{o}}</span>
                      <el-button style="float: right; padding: 3px 0" type="text" @click="handlego()">>>></el-button>
                    </div>
                    <div v-for="o in 4" :key="o" class="text item">
                      {{'列表内容 ' + o }}
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Repositories" name="first">
            <div class="card-repos">
              <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新建仓库</el-button>
              <repo-list v-bind:repolist="repolist"></repo-list>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Projects" name="third"></el-tab-pane>
          <el-tab-pane label="Packages" name="fourth"></el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!--弹出框-->
    <el-dialog title="新建仓库" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="拥有者" :label-width="formLabelWidth">
          <el-select v-model="form.user" :placeholder=nickname>
            <el-option :label=nickname :value=nickname>{{nickname}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="仓库名称" :label-width="formLabelWidth">
          <el-input v-model="form.reponame" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="仓库描述" :label-width="formLabelWidth">
          <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="form.desc"
                  maxlength="30"
                  show-word-limit
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createRepo()">确认创建</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import RepoList from '@/components/home/RepoList'
import { create, getRepos } from "@/api/repository";
import { mapState } from 'vuex'
import QS from 'qs'
import Vue from 'vue'
export default {
  inject: ['reload'],
  name: 'Home',
  components: {
    RepoList
  },
  computed: {
    ...mapState(["username"])
  },
  data() {
    return {
      currentDate: new Date(),
      activeName: 'first',
      dialogFormVisible: false,
      nickname: '',
      form: {
        reponame: '',
        user: '',
        desc: '',
      },
      formLabelWidth: '120px',
      repolist: [],
      realname: ""
    };
  },
  created() {
    let [,, targetname] = this.$route.path.split('/');
    this.nickname = targetname || this.$store.state.loginState.username || Vue.ls.get('username');
    this.realname = this.$store.state.loginState.username || Vue.ls.get('username')
    const path = '/' + this.nickname;
    getRepos(path)
      .then(res => {
        console.log(res)
        this.repolist = res.data.user_repositories
      })
  },
  methods: {
    handlego: function() {
      this.$router.push('/repodetail')
    },
    createRepo: function() {
      const param = {
        reponame: this.form.reponame,
        desc: this.form.desc,
        nickname: this.form.user
      };
      const params = QS.stringify(param);
      create(params)
        .then(res => {
          console.log(res)
          this.reload()
          this.$router.push({
            path: '/repodetail/',
            query: {
              username: param.nickname,
              reponame: param.reponame
            }
          })
        })
    },
    handleClick: function() {

    }
  }
}
</script>

<style scoped>
#home {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.profile{
  width: 20%;
  padding: 50px;
}
.repos {
  width: 65%;
}

.repos .el-row {
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
}


.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  /*width: 480px;*/
}





.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 26px;
}
.bottom span {
  margin: 0 5px;
}
.button {
  display: block;
  margin: 10px auto;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
.realname span {
  font-size: 1.5rem;
  color: #cf9236;
}
</style>
<template>
  <div class="nav">
    <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#fff">
      <el-menu-item index="#" disabled>电影采撷狮</el-menu-item>
      <el-menu-item index="/">知识图谱</el-menu-item>
      <el-menu-item index="/about">圈子</el-menu-item>
      <el-menu-item index="/find">发现
        <!-- <el-badge :value="3" class="bdgeitem">  </el-badge> -->
      </el-menu-item>
      <el-menu-item class="login" disabled>
        <div v-if="logonStatus" class="user">
          <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                            <i class="el-icon-user-solid"></i>
                        </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/bookMark" divided>收藏夹</el-dropdown-item>
              <el-dropdown-item command="/concern" divided>我的关注</el-dropdown-item>
              <el-dropdown-item command="/myEssay" divided>我的文章</el-dropdown-item>
              <el-dropdown-item command="/" divided>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div v-else>
          <span @click='dialogFormVisibleSignin = true'>登陆</span>
          <span @click='dialogFormVisibleSignup = true'>注册</span>
        </div>

      </el-menu-item>
    </el-menu>
    <el-dialog title='登陆' v-loading="loading" :visible.sync='dialogFormVisibleSignin' center>
      <el-form :model='formsignin' ref="formsignin" status-icon :rules="rulessignin">
        <el-form-item :label-width='formLabelWidth' prop="user">
          <el-input v-model='formsignin.user' placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item :label-width='formLabelWidth' prop="pwd">
          <el-input v-model='formsignin.pwd' type="password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item :label-width='formLabelWidth'>
          <el-button class="signin" @click="signin('formsignin')">登录</el-button>
        </el-form-item>
        <span class="forgetPwd" @click="forgetPwd">忘记密码</span>
      </el-form>
      <div slot='footer' class='dialog-footer thirdpartys'>
        <span>使用第三方登陆账号</span>
        <img class="thirdparty" src="../assets/QQ.png" alt="#">
        <img class="thirdparty" src="../assets/weixin.png" alt="#">
        <img class="thirdparty" src="../assets/weibo.png" alt="#">
      </div>
    </el-dialog>
    <!-- 弹出窗口进行注册 -->
    <el-dialog title='注册' :visible.sync='dialogFormVisibleSignup' center>
      <el-form :model='formsignup' ref="formsignup" status-icon :rules="rulessignup">
        <el-form-item :label-width='formLabelWidth' prop="user">
          <el-input v-model='formsignup.user' placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item :label-width='formLabelWidth' prop="pwd">
          <el-input v-model='formsignup.pwd' placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item :label-width='formLabelWidth'>
          <el-button class="signup" @click="signup('formsignup')">注册</el-button>
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer thirdpartys'>
        <span>使用第三方注册账号</span>
        <img class="thirdparty" src="../assets/QQ.png" alt="#">
        <img class="thirdparty" src="../assets/weixin.png" alt="#">
        <img class="thirdparty" src="../assets/weibo.png" alt="#">
      </div>
    </el-dialog>
    <!-- 忘记密码 -->
    <!-- <el-dialog title='找回密码' :visible.sync='dialogFormVisibleforgetPwd' center>
        <el-form :model='formforgetPwd' ref="formforgetPwd" status-icon :rules="rulessignup">
            <el-form-item :label-width='formLabelWidth' prop="user">
            <el-input v-model='formforgetPwd.user' placeholder="请输入手机号">
                <template slot="prepend">+86</template>
            </el-input>
            </el-form-item>
            <el-form-item :label-width='formLabelWidth' prop="pwd">
            <el-input class="checkpas" v-model='forgetPwd.pwd' placeholder="请输入验证码"></el-input>
            <el-button class="" @click='dialogFormVisibleforgetPwd = false'>发送验证码</el-button>
            </el-form-item>
            <el-form-item :label-width='formLabelWidth'>
            <el-button class="forgetPwd" @click='dialogFormVisibleforgetPwd = false'>找回</el-button>
            </el-form-item>
        </el-form>
    </el-dialog> -->
  </div>
</template>
<script>
  import {mapMutations} from 'vuex'

  let timer
  let lastTime
  export default {
    name: 'Nav',
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.formsignin.user !== '') {
            this.$refs.formsignin.validateField('user');
          }
          callback();
        }
      };
      var validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户'));
        } else {
          callback();
        }
      };
      return {
        dialogFormVisibleSignin: false,
        dialogFormVisibleSignup: false,
        dialogFormVisibleforgetPwd: false,
        formsignin: {
          user: '',
          pwd: ''
        },
        formsignup: {
          user: '',
          pwd: ''
        },
        rulessignin: {
          user: [
            {validator: validateUser, trigger: 'blur'}
          ],
          pwd: [
            {validator: validatePass, trigger: 'blur'}
          ]
        },
        rulessignup: {
          user: [
            {validator: validateUser, trigger: 'blur'}
          ],
          pwd: [
            {validator: validatePass, trigger: 'blur'}
          ]
        },
        formLabelWidth: '10px',
        loading: false
      }
    },
    computed: {
      logonStatus: function () {
        return this.$store.state.UserState.logonStatus
      },
      activeIndex: function () {
        return this.$store.state.PageState.hashUrl
      }
    },
    mounted() {
      this.judgeLogonStatus()
    },
    methods: {
      open() {
        var throt = function () {
          const h = this.$createElement;
          this.$notify({
            title: '请先登陆',
            message: h('i', {style: 'color: teal'}, '请先登陆')
          });
        }
        this.throttle(throt, this, 500)
      },
      throttle(fun, context, delay) { //函数节流
        let that = this
        let now = +new Date();
        if (lastTime && lastTime - now < 2000) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          fun.apply(context)
          lastTime = +new Date()
        }, delay)
      },
      toUser() {
        this.$router.push({path: '/user'})
      },
      handleSelect(item) {
        if (item == '/about' || item == '/find') {
          if (this.$store.state.UserState.logonStatus) {
            this.$router.push({path: item})
            this.saveHashUrl(item)
          } else {
            this.open()
          }
        } else {
          this.saveHashUrl(item)
          this.$router.push({path: item})
        }

      },
      ...mapMutations(
          'PageState', ['saveHashUrl']
      ),
      ...mapMutations(
          'UserState', ['judgeLogonStatus', 'removeLogonStatus']
      ),
      signin(formName) {//登陆
        this.loading = true
        this.$refs[formName].validate((valid) => {//验证表单是否合规
          if (valid) {
            var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/login/'
            this.api.post(PostUrl, {
              username: this.formsignin.user,
              password: this.formsignin.pwd,
            }).then(response => {
              if (response.status === 200) {
                this.$cookie.set('token', response.token, 1)
                this.$cookie.set('username', this.formsignin.user, 1)
                this.judgeLogonStatus()
                setTimeout(() => {
                  this.loading = false
                  this.dialogFormVisibleSignin = false
                }, 400)
                //, params: {searchtext: this.state}
              } else {
                this.$message.error(JSON.stringify(response.statusMessage))
                setTimeout(() => {
                  this.loading = false
                  this.dialogFormVisibleSignin = false
                }, 400)
              }
            })
          } else {
            this.loading = false
            return false
          }
        });
      },
      signup(formName) {//注册
        this.$refs[formName].validate((valid) => {//验证表单是否合规
          if (valid) {
            var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/join/'
            this.api.post(PostUrl, {
              'username': this.formsignup.user,
              'nickname': 'noe',
              'password': this.formsignup.pwd,
            }).then(response => {
              if (response.status === 200) {
                this.dialogFormVisibleSignup = false //关闭注册dialog
                this.dialogFormVisibleSignin = true  //打开登陆dialog
              } else {
                this.$message.error(JSON.stringify(response.statusMessage));
              }
            })
          } else {
            return false
          }
        });
      },
      forgetPwd() {//找回密码
        this.dialogFormVisibleSignin = false
        this.dialogFormVisibleforgetPwd = true
      },
      handleCommand(command) {
        if (command == '/') {
          this.$cookie.set('token', 'false', 1)
          this.$cookie.set('username', 'false', 1)
          this.removeLogonStatus()
        }
        this.$router.push({path: command})
      }
    }
  }
</script>

<style lang="stylus">
  body
    margin 0px

  .nav
    height: 8vh;
    overflow: hidden;

    .el-menu-item.is-disabled
      opacity 1
      cursor default

    .login
      position absolute
      right 20px

      .user
        text-align center

      span
        height 100%
        width 40px
        display inline-block
        cursor pointer

    .bdgeitem
      .el-badge__content.is-fixed
        top 10px
        height 15px
        line-height 15px
        padding 0 4px

    .el-form
      .signin, .signup
        width 100%
        background-color rgb(84, 92, 100)
        color rgb(251, 251, 251)

      .forgetPwd
        cursor pointer

      .checkpas
        width 40%

    .thirdpartys
      text-align center

      span
        display block

      .thirdparty
        width 18px
        height 18px
        margin 10px 10px

</style>

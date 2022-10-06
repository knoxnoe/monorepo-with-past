<template>
  <div id="login">
    <div class="login-input">
      <el-input placeholder="请输入昵称" v-model="username">
        <template slot="prepend">昵称</template>
      </el-input>
    </div>
    <div class="login-input">
      <el-input placeholder="请输入密码" v-model="pwd" show-password>
        <template slot="prepend">密码</template>
      </el-input>
    </div>
    <el-button @click="login" type="primary">登陆</el-button>
  </div>
</template>

<script>
  //import { login } from "@/api/login"
  import { mapActions } from 'vuex'
  import QS from 'qs'

  export default {
    name: "Login",
    data() {
      return {
        username: "",
        pwd: ""
      }
    },
    methods: {
      ...mapActions(['Login']),

      login: function() {
        const param = {
          nickname: this.username.trim(),
          password_hash: this.pwd.trim()
        };

        const params = JSON.stringify(param);
        //JSON.stringify
        this.Login(params)
          .then(res => this.loginSuccess(res),
            err => this.loginFailed(err))
      },
      loginSuccess: function(res) {
        this.$notify({
          title: '成功',
          message: res.msg,
          type: 'success'
        })
        this.$router.push("/home/" + this.username.trim())
      },
      loginFailed: function(err) {
        console.log("err" + err)
        this.$notify({
          title: '警告',
          message: "登录失败",
          type: 'warning'
        })
      }

    }
  }
</script>

<style scoped>
#login {
  text-align: center;
}
.login-input {
  margin: 20px 0px;

}
.el-input {
  width: 400px;
}
</style>
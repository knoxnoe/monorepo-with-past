<template>
  <div id="register">
    <div class="reg-input">
      <el-input class="username" placeholder="请输入内容" v-model="username" maxlength="10" clearable>
        <template slot="prepend">昵称</template>
      </el-input>
      <div class="suggestion">
        <p># 不超过10个字符</p>
      </div>
    </div>
    <div class="reg-input">
      <el-input placeholder="请输入内容" v-model="nickname" clearable>
        <template slot="prepend">账号</template>
      </el-input>
      <div class="suggestion">
        <p># 不超过10个字符</p>
      </div>
    </div>
    <div class="reg-input">
      <el-input placeholder="请输入密码" v-model="pwd" show-password clearable>
        <template slot="prepend">密码</template>
      </el-input>
      <div class="suggestion">
        <p># 不超过10个字符</p>
      </div>
    </div>
    <div class="reg-input">
      <el-input placeholder="请重新输入密码" v-model="repeat_pwd" show-password clearable>
        <template slot="prepend">确认</template>
      </el-input>
      <div class="suggestion">
        <p># 不超过10个字符</p>
      </div>
    </div>
    <el-button class="reg" @click="reg" type="primary">注册</el-button>
  </div>
</template>

<script>
  import { register } from "@/api/login";
  import QS from 'qs';
  const qs = require('qs');
  export default {
    name: "Register",
    data() {
      return {
        username: "",
        nickname: "",
        pwd: "",
        repeat_pwd: ""
      }
    },
    methods: {
      reg: function() {
        if(this.username === "" || this.nickname === "" || this.pwd === "" || this.repeat_pwd === "") {
          this.$notify({
            title: '警告',
            message: '请输入完整！！！',
            type: 'warning'
          })
        } else if(this.pwd !== this.repeat_pwd) {
          this.$notify({
            title: '警告',
            message: '两次输入密码不一致！',
            type: 'warning'
          })
        } else {
          const param = {
            nickname: this.nickname.trim(),
            password_hash: this.pwd.trim()
          };
          const params = QS.stringify(param);
          register(params)
            .then(res => this.regSuccess(res))
            .catch(err => this.regFailed(err))
            .finally(() => {

            })
        }
      },
      regSuccess: function(res) {
        if(res.status === 0) {
          this.$notify({
            title: '成功',
            message: res.msg,
            type: 'success'
          });
          this.$router.push('/login')
        } else {
          this.$notify({
            title: '警告',
            message: res.msg,
            type: 'warning'
          })
        }
      },
      regFailed: function(err) {
        this.$notify({
          title: '错误',
          message: err.msg,
          type: 'error'
        })
      }
    }
  }
</script>

<style scoped>
#register {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.reg-input {
  width: 400px;
  margin: 20px 0px;
  display: flex;
}
.el-input {
  width: 400px;
}
.suggestion p {
  width: 200px;
  line-height: 40px;
  margin-left: 20px;
  color: gray;
  font-size: 10px;
}

.reg {
  width: 300px;
}


/*.input-with-select .el-input-group__prepend {*/
/*  background-color: #fff;*/
/*}*/
</style>

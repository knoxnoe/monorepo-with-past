<template>
  <div id="noe-code">
    <div class="options">
      <div class="branch">
        <div class="branchs">
          <el-dropdown>
            <el-button type="primary">
              {{defaultBranch}}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(o, i) in branches" v-bind:key="i">{{o}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="cur-branch"></div>
      </div>
      <div class="curd">
        <div class="add">
          <el-dropdown @command="handleCommand">
            <el-button type="primary">
              Add file<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="create">Create new file</el-dropdown-item>
              <el-dropdown-item command="upload">Upload new file</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="download">
          <el-popover
                  placement="top"
                  width="300"
                  v-model="visible"
                  offset="100">
            <p>{{this.ssh}}</p>
            <el-button type="primary" size="mini" v-clipboard:copy="this.ssh"
                       v-clipboard:success="onCopy" @click="visible = false">复制
            </el-button>
            <el-button type="primary" size="mini" @click="download">下载</el-button>
            <el-button slot="reference" icon="el-icon-bottom">Code</el-button>
          </el-popover>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="content">
        <div class="head-info">
          <el-row>
            <el-col :span="8">
              <div class="grid-content">
                <p class="left-info">
                  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                  <span>Merge pull request #1 from abigaier/main</span>
                </p>
              </div>
            </el-col>
            <el-col :span="8"><div class="grid-content"></div></el-col>
            <el-col :span="8">
              <div class="grid-content">
                <p>22 hours ago Git stats 5 commits</p>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="files-list">
          <ul>
            <li v-for="(o,index) in [...fdir, ...ffile]" @click="enterDeep(o)" v-bind:key="index">
              <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">
                  <i class="el-icon-folder"></i>
                  <span class="filename">{{o}}</span>
                </div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple-light">
                  <p>commit info</p>
                </div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">
                  <p>22 hours</p>
                </div></el-col>
              </el-row>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <el-dialog
            title="上传文件"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
          <div>
            <el-upload
                    class="upload-demo"
                    drag
                    :action="uploadUrl()"
                    :limit="1"
                    multiple
                    ref="upload"
                    :http-request="uploadFiles"
                    :auto-upload="false"
                    :file-list="fileList"
                    >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <div>
              <el-button type="primary" @click="submitUpload">commit</el-button>
            </div>
          </div>
    </el-dialog>
  </div>
</template>

<script>
  import { uploadFile, downloadRepo, getBranchs } from "@/api/repository"
  import QS from 'qs'
  export default {
    inject: ['reload'],
    name: 'Code',
    props: {
      fdir: {
        type: Array,
        required: true
      },
      ffile: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        visible: false,
        username: "",
        reponame: "",
        ssh: "",
        dialogVisible: false,
        fileList: [],
        commit: "第一个递交",
        branches: [],
        defaultBranch: ""
      }
    },
    created() {
      this.username = this.$route.query.username;
      this.reponame = this.$route.query.reponame;
      this.ssh = "root@106.15.5.66:/gitrepo/" + this.username + "/" + this.reponame;

      const path = '/' + this.username + '/' + this.reponame;

      getBranchs(path)
        .then(res => {
          this.branches = res.data.branches
          this.defaultBranch = this.branches[0]
          console.log(res)
        })
    },
    methods: {
      enterDeep(o) {
        console.log(this.$route.path);
        this.$router.push({
          path: this.$route.path + o,
          query: {
            username: this.$route.query.username,
            reponame: this.$route.query.reponame
          }
        })
        this.reload()
      },
      // 复制剪切板功能
      onCopy () {
        this.$message.success("内容已复制到剪切板！")
      },
      // 上传文件
      openUpload() {
        this.dialogVisible = true;
      },
      handleClose() {
        this.dialogVisible = false;
      },
      handleCommand(command) {
        if(command === "upload") {
          this.openUpload()
        }
      },
      uploadUrl() {
        return '';
      },
      uploadFiles(val) {
        const form = new FormData();
        console.log(val.file)
        form.append('file', val.file)
        form.append('commit', this.commit)
        form.append('filename', val.file.name)
        form.append('filepath', this.getPath(this.$route.path))
        form.append('nickname', this.username)
        form.append('reponame', this.reponame)
        uploadFile(form)
          .then(res => {
            this.$notify({
              title: '成功',
              message: '成功上传',
              type: 'success'
            })
            this.dialogVisible = false;
          })
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      getPath(path) {
        let [, , ...strs] = path.split('/');
        let newPath = [...strs].join('/');
        return newPath;
      },
      download() {
        const param = {
          reponame: this.reponame,
          nickname: this.username
        };
        const params = QS.stringify(param);
        downloadRepo(params)
          .then(res => {
            //let blob = new Blob([JSON.stringify(res)], { type: 'application/gzip' });
            // console.log('blob', blob)
            var url = window.URL.createObjectURL(res);
            var a = document.createElement('a');
            a.href = url;
            a.download = this.reponame;
            a.click();
          })

      }
    }

  }
</script>

<style scoped>

.options {
  display: flex;
  justify-content: space-between;
  padding: 15px;
}

.curd {
  display: flex;
  justify-content: space-between;
  width: 250px;
}


.panel {
  padding: 0 15px;
}
.panel .content {

}
.panel .content .head-info {
  padding: 10px 20px;
  background: azure;
  border: 1px solid gray;
  border-radius: 5px 5px 0px 0px;
  height: 55px;
  line-height: 55px;
}

.panel .content .head-info .left-info {
  display: flex;
  align-items: center;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.files-list {
  border: 1px solid gray;
  border-radius: 0 0 5px 5px;
}
.files-list ul li {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid gray;
  padding: 0 20px;
  font-size: 1.2rem;
}
.files-list ul li .filename {
  margin-left: 8px;
}


{

}
</style>
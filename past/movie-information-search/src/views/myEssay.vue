<template>
  <div class="essay">
    <div style="margin:20px 0;">
      <el-button type="primary" icon="el-icon-edit-outline" @click="EditingArticlesDialogVisible = true">发表文章
      </el-button>
    </div>
    <keep-alive>
      <aboutList :dataList="essaysList"></aboutList>
    </keep-alive>
    <el-dialog
            title="编辑文章"
            :visible.sync="EditingArticlesDialogVisible"
            width="80%"
            center>

      <el-input
              class="editContent"
              type="textarea"
              :rows="2"
              placeholder="saying something..."
              v-model="textarea">
      </el-input>

      <el-autocomplete
              class="inline-input"
              v-model="movie"
              :fetch-suggestions="querySearch"
              placeholder="请输入想要描述的电影"
              :trigger-on-focus="false"
              @select="handleSelect">
      </el-autocomplete>
      <!-- 上传图片功能，未上线 -->
      <!-- <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              ref="upload"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="submit"
              :auto-upload="false"
              :file-list="fileList">
        <i class="el-icon-plus"></i>
        <el-button style="margin-top: 10px;display:block;" size="small" type="success" @click="submitUpload">上传到服务器
        </el-button>
      </el-upload> -->
      <span slot="footer" class="dialog-footer">
					<el-button @click="EditingArticlesDialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="publishArticle">发表</el-button>
				</span>
    </el-dialog>
    <!-- 查看图片详情 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
  import aboutList from '@/components/aboutList.vue'
  export default {
    components: {
      aboutList
    },
    data() {
      return {
        EditingArticlesDialogVisible: false,
        dialogImageUrl: '',
        dialogVisible: false,
        textarea: '',
        fileList: [],
        essaysList: [],
        movie: '',
        restaurants: [],
        movidId: ''
      }
    },
    mounted() {
      this.getArticles()
      this.restaurants = this.loadAll()
    },
    methods: {
      async querySearch(queryString, cb) {
        var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/subject/movie/search/'
        await this.api.get(PostUrl, {
          title: queryString
        }).then(response => {
          if (response.status === 200) {
            this.restaurants = response.data
          } else {
            this.$message.error(JSON.stringify(response.statusMessage));
          }
        })
        var restaurants = this.restaurants;
        var keyMap = {
          "title": "value"
        };
        restaurants.forEach(function (item, index) {
          for (var key in item) {
            var newKey = keyMap[key]
            if (newKey) {
              item[newKey] = item[key];
              delete item[key];
            }
          }
        })
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        cb(results);

      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          {"value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号"},
          {"value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13"}
        ];
      },
      getRecommedList(queryString) {

      },
      handleSelect(item) {
        this.movidId = item.id
      },
      submitUpload() {//提交上传文章
        this.$refs.upload.submit();
      },
      submit(response, file, fileList) {
        console.log(response)
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      publishArticle() {//发表文章
        var param
        if (this.movidId) {
          param = {
            content: this.textarea,
            token: this.$store.state.UserState.token,
            movie_id: this.movidId
          }
        } else {
          param = {
            content: this.textarea,
            token: this.$store.state.UserState.token
          }
        }

        if (this.textarea.length > 0) {
          this.EditingArticlesDialogVisible = false
          var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/article/'
          this.api.post(PostUrl, param).then(response => {
            console.log(response)
            this.movidId = ''
            if (response.status === 200) {
              this.getArticles()
              this.textarea = ''
            } else {
              this.$message.error(JSON.stringify(response.statusMessage));
            }
          })
        } else {
          this.$message.error('文章内容不能为空');
        }
      },
      getArticles() {
        var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/user/' + this.$store.state.UserState.username + '/articles/'
        this.api.get(PostUrl, {
          username: this.$store.state.UserState.username,
          start: 0,
          end: 20
        }).then(response => {
          if (response.status === 200) {
            this.essaysList = response.data
          } else {
            this.$message.error(JSON.stringify(response.statusMessage));
          }
        })
      }
    }
  }
</script>
<style lang="stylus">
.essay
  padding 0 40px
  height 92vh
  overflow hidden
.editContent
  margin-bottom 20px
</style>

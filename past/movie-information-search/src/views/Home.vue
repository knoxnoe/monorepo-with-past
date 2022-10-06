<template>
  <div class='page-main'>
    <div style="margin-top: 15px;">
      <el-autocomplete
              size="large"
              clearable
              placeholder="请输入内容"
              v-model="input"
              class="input-with-select"
              :fetch-suggestions="querySearch"
              :trigger-on-focus="false"
              @select="handleSelect">
        <el-select v-model="select" slot="prepend">
          <el-option label="知识图谱" value="1"></el-option>
          <el-option label="知识问答" value="2"></el-option>
        </el-select>
        <el-button type="primary" slot="append" icon="el-icon-search" class="noe-search" @click="search">搜索</el-button>
      </el-autocomplete>
      <div class="smart_res" v-if="smartRes">
        <p>{{'fsdfasfasdfasdfsadf'}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        input: '',
        select: '1',
        restaurants: [],
        smartRes: false
      }
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          {"value": "周星驰", "address": "长宁区新渔路144号"},
          {"value": "周润发", "address": "上海市长宁区淞虹路661号"},
          {"value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113"},
          {"value": "泷千家(天山西路店)", "address": "天山西路438号"},
          {"value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"},
          {"value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13"}
        ];
      },
      handleSelect(item) {
        console.log(item)
      },
      search() {
        if (this.select == 1 && this.input.length > 0) {//搜索分类分支1
          this.$cookie.set('currentSearchText', this.input, 1)
          this.$cookie.set('searchStyle', '1', 1)
          this.$router.push({name: 'res', params: {searchText: this.input, searchStyle: '1'}})
        } else if (this.select == 2 && this.input.length > 0) {//搜索分类分支2
          this.$cookie.set('currentSearchText', this.input, 1)
          this.$cookie.set('searchStyle', '2', 1)
          this.$router.push({name: 'res', params: {searchText: this.input, searchStyle: '2'}})
        } else {
          var h = this.$createElement;
          this.$notify({
            title: '警告',
            type: 'warning',
            message: h('i', {style: 'color: teal'}, '没有选择搜索分类或搜索内容为空')
          });
        }
      },
      smartSearch() {
        var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1/subject/smart_search/'
        this.api.get(PostUrl, {
          query: this.input
        }).then(response => {
          console.log(response)
          if (response.status === 200) {
          } else {
            this.$message.error(JSON.stringify(response.statusMessage));
          }
        })
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    }
  }
</script>
<style lang="stylus">
  body
    margin 0

  .page-main
    text-align center
    padding-top 200px

    .input-with-select
      .el-input__inner
        width 500px

      .el-input-group__prepend
        .el-input__inner
          width 110px

      .noe-search
        background-color rgb(84, 92, 100) !important
        color #ffffff !important

    .smart_res
      width 62%
      margin 0 auto
      text-align left
</style>
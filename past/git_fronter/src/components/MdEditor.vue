<template>
  <div>
    <mavon-editor
            class="md"
            :value="value"
            :subfield="false"
            :defaultOpen="'preview'"
            :toolbarsFlag="false"
            :editable="false"
            :scrollStyle="true"
            :ishljs="false"
    ></mavon-editor>

    <hr/>
<!--    <div class="main">-->
<!--      <el-row>-->
<!--        <el-col :md="3" :lg="6" :xl="8" class="hidden-sm-and-down">&nbsp;</el-col>-->
<!--        <el-col :sm="24" :md="18" :lg="12" :xl="8">-->
<!--          <div v-html="html" class="center"></div>-->
<!--        </el-col>-->
<!--        <el-col :md="3" :lg="6" :xl="8" class="hidden-sm-and-down">&nbsp;</el-col>-->
<!--      </el-row>-->
<!--    </div>-->

<!--    <VueMarkdown :source="md"></VueMarkdown>-->
  </div>
</template>

<script>
  //import mavonEditor from 'mavon-editor';
  //import "mavon-editor/dist/css/index.css";
  import readme from '../assets/README.md';
  //import VueMarkdown from 'vue-markdown';
  // // 代码高亮
  import 'highlight.js/styles/github.css'
  // // 其他元素使用 github 的样式
  import 'github-markdown-css'

  import showdown from 'showdown';
  export default {
    name: "MdEditor",
    components:{
    },
    data() {
      return {
        md: readme,
        html: '',
        value: '# 图像与滤波\n' +
          '\n' +
          '**图像本质上就是各种色彩波的叠加。**\n' +
          '\n' +
          'http://www.ruanyifeng.com/blog/2017/12/image-and-wave-filters.html\n' +
          '\n' +
          '- [低通滤波器](https://baike.baidu.com/item/低通滤波)（lowpass）：减弱或阻隔高频信号，保留低频信号\n' +
          '- [高通滤波器](https://baike.baidu.com/item/高通滤波)（highpass）：减弱或阻隔低频信号，保留高频信号'
      }
    },
    mounted() {
      let converter = new showdown.Converter()
      let text = this.md.toString()
      this.html = converter.makeHtml(text)
    }

  }
</script>

<style scoped>
  .markdown-body {
    padding: 80px;
  }
  .main {
    padding: 10px 30px;
  }
  blockquote {
    border-left: #eee solid 5px;
    padding-left: 15px;
    color: #8e8e8e;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
  ul li {
    line-height: 25px;
  }
  pre code {
    background: #F6F6F6;
  }
  p code {
    color: #D34B62;
    background: #F6F6F6;
    margin: 0 2px;
  }

  @keyframes squeezeBody {
    from {
      width: 100%;
    }
    to {
      width: calc(100% - 300px);
    }
  }

  @-webkit-keyframes squeezeBody {
    from {
      width: 100%;
    }
    to {
      width: calc(100% - 300px);
    }
  }

  @keyframes stretchBody {
    from {
      width: calc(100% - 300px);
    }
    to {
      width: 100%;
    }
  }

  @-webkit-keyframes stretchBody {
    from {
      width: calc(100% - 300px);
    }
    to {
      width: 100%;
    }
  }

  .squeezed-body {
    animation: squeezeBody 0.5s ease;
    -webkit-animation: squeezeBody 0.5s ease;
    width: calc(100% - 300px);
  }

  .full-body {
    animation: stretchBody 0.5s ease;
    -webkit-animation: stretchBody 0.5s ease;
    width: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Old Standard TT', serif;
    font-weight: bold;
  }

  h1 {
    border-bottom: 1px solid #ddd;
  }

  .serif {
    font-family: 'Old Standard TT', serif;
  }

  .top-bar {
    height: 45px;
    min-height: 45px;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }

  .bars-lnk {
    color: #fff;
  }

  .bars-lnk i {
    display: inline-block;
    margin-left: 10px;
    margin-top: 7px;
  }

  .bars-lnk img {
    display: inline-block;
    margin-left: 10px;
    margin-top: -15px;
    margin-right: 15px;
    height: 35px;
  }

  .lateral-menu {
    background-color: #333;
    color: rgb(144, 144, 144);
    width: 300px;
    font-family: 'Open Sans', 'Myriad Pro', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Geneva, Verdana, sans-serif;
  }

  .lateral-menu label {
    color: rgb(144, 144, 144);
  }

  .lateral-menu-content {
    padding-left: 10px;
    height: 100%;
    font-size: 12px;
    font-style: normal;
    font-variant: normal;
    font-weight: bold;
    line-height: 16px;
  }

  .lateral-menu-content .title {
    padding-top: 15px;
    font-size: 2em;
    height: 45px;
  }

  .lateral-menu-content-inner {
    overflow-y: auto;
    height: 100%;
    padding-top: 10px;
    padding-bottom: 50px;
    padding-right: 10px;
    font-size: 0.9em;
  }

  .container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: stretch;
    width: 100%;
    height: 100%;
    padding-top: 65px;
  }

  .container>* {
    display: block;
    width: 50%;
    margin-left: 10px;
    margin-right: 10px;
    max-height: 100%;
  }

  .container textarea {
    resize: none;
    font-family: Consolas, "Liberation Mono", Courier, monospace;
    height: 97%;
    max-height: 97%;
    width: 45%;
  }

  #preview {
    height: 97%;
    max-height: 97%;
    border: 1px solid #eee;
    overflow-y: scroll;
    width: 55%;
    padding: 10px;
  }

  pre {
    white-space: pre-wrap;
    /* css-3 */
    white-space: -moz-pre-wrap;
    /* Mozilla, since 1999 */
    white-space: -pre-wrap;
    /* Opera 4-6 */
    white-space: -o-pre-wrap;
    /* Opera 7 */
    word-wrap: break-word;
    /* Internet Explorer 5.5+ */
    background-color: #f8f8f8;
    border: 1px solid #dfdfdf;
    margin-top: 1.5em;
    margin-bottom: 1.5em;
    padding: 0.125rem 0.3125rem 0.0625rem;
  }

  pre {
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f6f8fa;
    border-radius: 3px;
  }

  .modal-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: rgba(51, 51, 51, 0.5);
  }

  .modal-inner {
    margin-top: 200px;
    margin-left: auto;
    margin-right: auto;
    width: 600px;
    height: 225px;
    background-color: #fff;
    opacity: 1;
    z-index: 1000;
  }

  .modal-close-btn {
    float: right;
    display: inline-block;
    margin-right: 5px;
    color: #ff4336;
  }

  .modal-close-btn:hover {
    float: right;
    display: inline-block;
    margin-right: 5px;
    color: #8d0002;
  }

  .modal-topbar {
    clear: both;
    height: 25px;
  }

  .modal-inner .link-area {
    margin: 10px;
    height: 170px;
  }

  .modal-inner textarea {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  .version {
    color: white;
    font-size: 0.8em !important;
  }
</style>
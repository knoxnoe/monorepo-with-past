<template>
  <div>
    <div v-if="isSummary" class="summary">
        <p >{{summary}}</p>
    </div>
    <div id="echartss">
    </div>
  </div>
</template>
<script>
  import vue from 'vue'
  import echarts from 'echarts'
  export default {
    props: {
      rdf: Array,
      centersearch: String
    },
    data() {
      return {
        summary: '',
        isSummary: false,
        proxydata: [],
        proxydatacopy: [],
        proxyedges: [],
        proxyedgescopy: [],
        shouldRefresh: true,
        chart_rdf: [],
        categorie: 0,
        option: {
          series: [{
            type: 'graph',
            layout: 'force',
            animation: true,
            roam: true,
            data: [],
            draggable: true,
            categories: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            label: {
              normal: {
                show: true,
                position: 'inside',
                formatter: function (params) {
                  return params.data.name;//返回标签
                },
              }
            },
            lineStyle: {//==========关系边的公用线条样式。
              normal: {
                show: true,
                color: 'rgba(0,0,0,0.4)',
                width: '3',
                type: 'solid',
                curveness: 0,
                opacity: 1
              },
            },
            edgeLabel: {//==============线条的边缘标签
              normal: {
                show: true
              },
            },
            force: {
              initLayout: 'circular',
              gravity: 0.03,
              repulsion: 200,
              edgeLength: 250
            },
            edges: [],
          }]
        }
      }
    },
    mounted() {
      // 绘制图表，this.echarts1_option是数据
      this.chart_rdf = this.rdf
      this.init();
    },
    methods: {
      init: function () {
        //绑定点击事件
        var that = this
        var myChart = echarts.init(document.getElementById('echartss'));
        myChart.on('dblclick', function (param) {
          if (param.dataType == 'node') {
            if (param.data.click == false) {
              that.onChartClickmovie(param.data)
            } else {
              that.onChartClickperson(param.data)
            }
          }
        });
        myChart.on('mouseover', function (param) {
          that.summary = param.data.summary
          that.isSummary = true
          // if (param.dataType == 'node') {
          //   if (param.data.click == false) {
          //     console.log(param)
          //     // that.onChartClickmovie(param.data)
          //   } else {
          //     console.log(param)
          //     // that.onChartClickperson(param.data)
          //   }
          // }
        });
        //length不一定存在，后面再说
        if (!this.chart_rdf[0]) return false
        if (this.chart_rdf[0].movies) {
          this.proxydata.push({
            id: this.chart_rdf[0].id,
            category: that.categorie,
            name: this.chart_rdf[0].name,
            symbol: 'circle',
            value: this.temprelation,
            symbolSize: 40,
            fixd: true,
            click: true,
            url: this.chart_rdf[0].url,
            summary: this.chart_rdf[0].summary
          })
          that.categorie++
          for (var i = 0; i < this.chart_rdf[0].movies.length; i++) {
            this.addNode({
              id: this.chart_rdf[0].movies[i].movie.id,
              category: that.categorie,
              name: this.chart_rdf[0].movies[i].movie.title,
              symbol: 'circle',
              value: this.chart_rdf[0].movies[i].role,
              symbolSize: 40,
              fixd: true,
              click: false,
              url: this.chart_rdf[0].movies[i].movie.url,
              summary: this.chart_rdf[0].movies[i].movie.summary
            })
            this.addEdge({
              source: JSON.stringify(this.chart_rdf[0].id),
              target: JSON.stringify(this.chart_rdf[0].movies[i].movie.id)
            })
            this.drawchart()
          }
          that.categorie++
        } else if (this.chart_rdf[0].persons) {
          this.proxydata.push({
            id: this.chart_rdf[0].id,
            category: that.categorie,
            name: this.chart_rdf[0].title,
            symbol: 'circle',
            value: this.temprelation,
            symbolSize: 40,
            fixd: true,
            click: false,
            url: this.chart_rdf[0].url,
            summary: this.chart_rdf[0].summary
          })
          that.categorie++
          for (var i = 0; i < this.chart_rdf[0].persons.length; i++) {
            this.addNode({
              id: this.chart_rdf[0].persons[i].person.id,
              category: that.categorie,
              name: this.chart_rdf[0].persons[i].person.name,
              symbol: 'circle',
              value: this.chart_rdf[0].persons[i].role,
              symbolSize: 40,
              fixd: true,
              click: true,
              url: this.chart_rdf[0].persons[i].person.url,
              summary: this.chart_rdf[0].persons[i].person.summary
            })
            this.addEdge({
              source: JSON.stringify(this.chart_rdf[0].id),
              target: JSON.stringify(this.chart_rdf[0].persons[i].person.id)
            })
            this.drawchart()
          }
          that.categorie++
        }

      },
      //画
      drawchart() {
        var myChart = echarts.init(document.getElementById('echartss'));
        myChart.setOption(this.option);
      },
      //加点
      addNode(node) {
        var index = 0;
        for (var i = 0; i < this.proxydata.length; i++) {
          if (node.id == this.proxydata[i].id) {
            break;
          } else {
            index++;
          }
        }
        if (index == this.proxydata.length) {
          this.proxydata.push(node)
        }
        this.option.series[0].data = this.proxydata
      },
      //加边
      addEdge(edge) {
        this.proxyedges.push(edge)
        this.option.series[0].edges = this.proxyedges
      },
      //请求数据
      httpMovie(url) {
        var that = this;
        var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1' + url
        this.api.get(PostUrl).then(response => {
          if (response.status === 200) {
            var temp = response.data;
            for (var i = 0; i < temp.movies.length; i++) {
              that.addNode({
                id: temp.movies[i].movie.id,
                category: that.categorie,
                name: temp.movies[i].movie.title,
                symbol: 'circle',
                value: temp.movies[i].role,
                symbolSize: 40,
                fixd: true,
                click: false,
                url: temp.movies[i].movie.url,
                summary: temp.movies[i].movie.summary
              })
              that.addEdge({source: JSON.stringify(temp.id), target: JSON.stringify(temp.movies[i].movie.id)})
              that.drawchart()
            }
            that.categorie++
          }
        }).catch(error => {
          console.log(error)
        })
      },
      httpPerson(url) {
        var that = this;
        var PostUrl = this.$store.state.BaseConfig.httpsUrl + '/api/v1' + url
        this.api.get(PostUrl).then(response => {
          if (response.status === 200) {
            var temp = response.data;
            for (var i = 0; i < temp.persons.length; i++) {
              that.addNode({
                id: temp.persons[i].person.id,
                category: that.categorie,
                name: temp.persons[i].person.name,
                symbol: 'circle',
                value: temp.persons[i].role,
                symbolSize: 40,
                fixd: true,
                click: true,
                url: temp.persons[i].person.url,
                summary: temp.persons[i].person.summary
              })
              that.addEdge({source: JSON.stringify(temp.id), target: JSON.stringify(temp.persons[i].person.id)})
              that.drawchart()
            }
            that.categorie++
          }
        }).catch(error => {
          console.log(error)
        })
      },
      //点击电影节点请求人
      onChartClickmovie: function (param) {
        // this.$emit('childmessage',param)
        this.httpPerson(param.url)
      },
      //点击人节点请求电影
      onChartClickperson: function (param) {
        // this.$emit('childmessage',param)
        this.httpMovie(param.url)
      }
    }
  }
</script>
<style lang="stylus">
.summary
  position absolute
  width 400px
#echartss
  width 100%
  height 100vh
  box-sizing border-box
</style>

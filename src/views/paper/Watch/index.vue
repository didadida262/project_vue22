<!--
 * @Author: Hhvcg
 * @Date: 2022-12-30 11:15:36
 * @LastEditors: -_-
 * @Description:
-->

<template>
  <div class="pixel-container pd10">
    <commonTemplate title="pixel" />
    <div class="flex-cb pd10" style="width: 100%;height:calc(100% - 80px)">
      <div class="pixel-container-operation border-common pd10">
          <el-button @click="handleBinary">Binary</el-button>
      </div>
      <div class="pixel-container-content flex-col-sc">
        <div class="pixel-container-content-pic">
          <PaperPic
            :picInfo="picInfo"
            @handlePicEvent="handlePicEvent"
          />
        </div>
        <div
        ref="myChart"
        class="pixel-container-content-echarts">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import * as echarts from 'echarts'
import commonTemplate from '@/components/titleTemplate.vue'
import PaperPic from './components/PaperPic.vue'
import paper from 'paper'
export default {
  name: 'pixel',
  components: {
    commonTemplate,
    PaperPic
  },
  data() {
    return {
      title: 'pixel',
      picInfo: {
        src: require('@/assets/slogan.jpg'),
        title: 'PL',
        mode: 'common'
      }
    }
  },
  computed: {
  },
  watch: {},
  mounted() {
  },
  methods: {
    handleBinary() {
      console.log('binary_deal')
      this.picInfo.mode = 'binary'

      // this.initEcharts(this.picPixData)
    },
    preDealData(obj) {
      const arr = []
      for (const key in obj) {
        const x = []
        x[0] = key
        x[1] = obj[key]
        arr.push(x)
      }
      return arr
    },
    initEcharts(obj) {
      console.log('echarts>>', echarts)
      const myChart = echarts.init(this.$refs['myChart'])
      const data = this.preDealData(obj)
      const option = {
        title: {
          text: 'Sample View',
          left: '1%'
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '5%',
          right: '15%',
          bottom: '10%'
        },
        xAxis: {
          data: data.map(function(item) {
            return item[0]
          })
        },
        yAxis: {},
        toolbox: {
          right: 10,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [
          {
            startValue: '2014-06-01'
          },
          {
            type: 'inside'
          }
        ],
        visualMap: {
          top: 50,
          right: 10,
          pieces: [
            {
              gt: 0,
              lte: 50,
              color: '#93CE07'
            },
            {
              gt: 50,
              lte: 100,
              color: '#FBDB0F'
            },
            {
              gt: 100,
              lte: 150,
              color: '#FC7D02'
            },
            {
              gt: 150,
              lte: 200,
              color: '#FD0100'
            },
            {
              gt: 200,
              lte: 300,
              color: '#AA069F'
            },
            {
              gt: 300,
              color: '#AC3B2A'
            }
          ],
          outOfRange: {
            color: '#999'
          }
        },
        series: {
          name: 'Beijing AQI',
          type: 'line',
          data: data.map(function(item) {
            return item[1]
          }),
          markLine: {
            silent: true,
            lineStyle: {
              color: '#333'
            },
            data: [
              {
                yAxis: 50
              },
              {
                yAxis: 100
              },
              {
                yAxis: 150
              },
              {
                yAxis: 200
              },
              {
                yAxis: 300
              }
            ]
          }
        }
      }

      // 绘制条形图
      myChart.setOption(option)
    },
    handlePicEvent(event) {
      if (event.loadedSuccess) {
        this.test()
      }
      if (event.type === 'submitData') {
        this.picPixData = event.data
        this.initEcharts(this.picPixData)
      }
    },
    test() {
    }
  },
  beforeDestroy() {

  }

}
</script>
<style scoped lang="scss">
.pixel-container {
  width: 100%;
  height: 100%;
  &-operation {
    width: 200px;
    height: 100%;
  }
  &-content {
    width: calc(100% - 220px);
    height: 100%;
    &-pic {
      width: 100%;
      height: calc(100% - 480px);
    }
    &-echarts {
      width: 100%;
      height: 450px;
      border: 1px solid gray;
    }
  }
}
</style>

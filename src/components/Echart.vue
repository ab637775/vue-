<template>
  <div ref="echart" style="height:280px"></div>
</template>

<script>
import { getData } from '@/request/api/index.js'
import * as echarts from 'echarts'
export default {
  name: 'Echart',
  props: ['chartType'],
  data () {
    return {
      myType: ''
    }
  },
  mounted () {
    this.myType = this.chartType
    // console.log(this.myType)
    getData().then(res => {
      // console.log(res)
      const { code, data } = res.data
      const order = data.orderData
      const userData = data.userData
      const videoData = data.videoData
      if (this.chartType === 'line') {
        const xDate = order.date
        const keyArray = Object.keys(order.data[0])
        // console.log(order)
        console.log(videoData)
        // console.log(keyArray)
        const series = []
        keyArray.forEach(key => {
          series.push({
            name: key,
            data: order.data.map(item => item[key]),
            type: 'line'
          })
        })
        // console.log(series)
        const option_line = {
          xAxis: {
            data: xDate
          },
          yAxis: {},
          legend: {
            data: keyArray
          },
          series
        }
        const eline = echarts.init(this.$refs.echart)
        eline.setOption(option_line)
        // console.log([this.$refs.echart])
      } else if (this.chartType === 'bar') {
        const barDate = userData.map(item => item.date)
        const option_user = {
          legend: {
          // 图例文字颜色
            textStyle: {
              color: '#333'
            }
          },
          grid: {
            left: '20%'
          },
          // 提示框
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category', // 类目轴
            data: barDate,
            axisLine: {
              lineStyle: {
                color: '#17b3a3'
              }
            },
            axisLabel: {
              interval: 0,
              color: '#333'
            }
          },
          yAxis: [
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: '#17b3a3'
                }
              }
            }
          ],
          color: ['#2ec7c9', '#b6a2de'],
          series: [{
            name: '新增用户',
            data: data.userData.map(item => item.new),
            type: 'bar'
          }, {
            name: '活跃用户',
            data: data.userData.map(item => item.active),
            type: 'bar'
          }]
        }
        this.$refs.echart.style.height = '260px'
        const ebar = echarts.init(this.$refs.echart)
        ebar.setOption(option_user)
      } else if (this.chartType === 'pie') {
        const option_video = {
          tooltip: {
            trigger: 'item'
          },
          color: [
            '#0f78f4',
            '#dd536b',
            '#9462e5',
            '#a6a6a6',
            '#e1bb22',
            '#39c362',
            '#3ed1cf'
          ],
          series: [{
            type: 'pie',
            data: videoData
          }]
        }
        this.$refs.echart.style.height = '170px'
        const epie = echarts.init(this.$refs.echart)
        epie.setOption(option_video)
      }
    })
  }
}
</script>

<style>

</style>

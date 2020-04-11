<template>
    <div>
      <Chart :option="chartOptions" style="height: 500px"></Chart>
    </div>
</template>

<script>
  // import random from 'lodash/random'
  // import axios from "axios";
  import request from '../../utils/request';
  import Chart from '../../components/Chart';
  export default {
    name: "Analysis",
    data() {
      return {
        chartOptions: {
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [40,40,78,10,30,48]
          }]
        }
      }
    },
    mounted() {
      this.getChartData()
      this.interval = setInterval(() => {
        this.getChartData()
      },3000)
    },
    methods: {
      getChartData() {
        request({
          url:"/api/dashboard/chart",
          method:'get',
          params:{ID: 12345},
        })
        // axios.get('/api/dashboard/chart', {params: {ID: 12345}})
        //   .then((response) => {
        //     this.chartOptions = {
        //       title: {
        //         text: 'ECharts 入门示例'
        //       },
        //       tooltip: {},
        //       xAxis: {
        //         data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        //       },
        //       yAxis: {},
        //       series: [{
        //         name: '销量',
        //         type: 'bar',
        //         data: response.data
        //       }]
        //     }
        //     }
        //   )
      }
    },
    beforeDestroy() {
      clearInterval(this.interval)
    },
    components: {
      Chart,
    }
  }
</script>

<style scoped>

</style>

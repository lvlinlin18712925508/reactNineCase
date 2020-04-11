<template>
    <div ref="chartDom"></div>
</template>

<script>
  import echarts from 'echarts';
  import debounce from 'lodash/debounce';
  import { addListener, removeListener} from 'resize-detector'
    export default {
      name: "Chart",
      props: {
        option: {
          type: Object,
          default: () => {},
        }
      },
      watch: {
        option(val) {
          this.chart.setOption(val)
        }
      },
      created() {
        this.resize = debounce(this.resize, 300)
      },
      mounted() {
        this.renderChart();
        addListener(this.$refs.chartDom, this.resize);
      },
      methods: {
        resize() {
          this.chart.resize()
        },
        renderChart() {
          this.chart = echarts.init(this.$refs.chartDom);
          this.chart.setOption(this.option);
        }
      },
      beforeDestroy() {
        removeListener(this.$refs.chartDom, this.resize)
        this.chart.dispose()
        this.chart = null;
      }
    }
</script>

<style scoped>

</style>

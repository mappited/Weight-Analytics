<template>
  <v-chart class="chart" :option="option" :key="componentKey" ref="thechart" autoresize />
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { defineComponent } from "vue";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);

export default defineComponent({
  name: "demoChart",
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "light"
  },
  props:{
    xAxisData: Array,
    yAxisData: Array
  },
  mounted (){
    this.$forceUpdate()
  },
  methods: {
    forceRerender(xd, yd, my) {
      console.log(xd);
      console.log(yd);
      this.option = {xAxis: {
          type: "category",
          data: xd,
        },
        yAxis: {
            type: 'value',
            min: my,
        },
        series: [{
            data: yd,
            type: 'line',
            connectNulls: true,

            lineStyle: {
              color: '#54F391',
              width: 3,
              shadowColor: 'rgba(33, 208, 53, 0.82)',
              shadowBlur: 10,
              shadowOffsetY: 4
            },
            itemStyle: {
              opacity:1,
              color:"red",
            }
        }],
        grid: {
          left: 50,
          top: 60,
          right: 50,
          bottom: 50
        }
      }

      this.$refs.thechart.setOption(this.option)
      this.componentKey += 1;
    }

  },
  data: function () {
    return{
      componentKey: 0,
      option:
      {xAxis: {
          type: "category",
          data: this.xAxisData
        },
        yAxis: {
            type: 'value',
            min: 20,
        },
        series: [{
            data: this.yAxisData,
            type: 'line',
            connectNulls: true,

            lineStyle: {
              color: '#54F391',
              width: 3,
              shadowColor: 'rgba(33, 208, 53, 0.82)',
              shadowBlur: 10,
              shadowOffsetY: 4
            },
            itemStyle: {
              opacity:1,
              color:"red",
            }
        }],
        grid: {
          left: 50,
          top: 60,
          right: 50,
          bottom: 50
        }
      }
    }
  }
});
</script>

<style scoped>

@media (min-width:731px){
  .chart {
    height: 350px
  }
}

@media (max-width:730px){
  .chart {
    height: 233px
  }

}
</style>

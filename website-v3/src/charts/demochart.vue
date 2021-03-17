<template>
  <v-chart class="chart" :option="option" autoresize />
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
    console.log(this.option)
  },
  data: function () {
    return{
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

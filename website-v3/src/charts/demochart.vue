<template>
  <v-chart autoresize class="chart" :option="option"  />
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
import { ref, defineComponent } from "vue";

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
  setup: () => {
    const option = ref({
      xAxis: {
        type: "category",
        data: ['14.03.2021', '15.03.2021', '16.03.2021', '17.03.2021', '18.03.2021', '19.03.2021', '20.03.2021']
      },
      yAxis: {
          type: 'value',
          min: 30,
      },
      series: [{
          data: [50, 51, 50.5, 52, 52.5, 50, 49],
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
    });

    return { option };
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

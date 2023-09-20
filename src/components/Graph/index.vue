<template>
  <div ref="main" id="main"></div>
</template>
<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
//  按需引入 echarts
const main = ref(); // 使用ref创建虚拟DOM引用，使用时用main.value
onMounted(() => {
  init();
});
function init() {
  // 基于准备好的dom，初始化echarts实例
  var myChart = proxy.$echarts.init(main.value);
  // 指定图表的配置项和数据
  var option = {
    title: {
      text: "Basic Graph",
    },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: "quinticInOut",
    series: [
      {
        type: "graph",
        layout: "none",
        symbolSize: 50,
        roam: true,
        label: {
          show: true,
        },
        edgeSymbol: ["circle", "arrow"],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          fontSize: 20,
        },
        data: [
          {
            name: "Node 1",
            x: 300,
            y: 300,
          },
          {
            name: "Node 2",
            x: 800,
            y: 300,
          },
          {
            name: "Node 3",
            x: 550,
            y: 100,
          },
          {
            name: "Node 4",
            x: 550,
            y: 500,
          },
        ],
        // links: [],
        links: [
          {
            source: 0,
            target: 1,
            symbolSize: [5, 20],
            label: {
              show: true,
            },
            lineStyle: {
              width: 5,
              curveness: 0.2,
            },
          },
          {
            source: "Node 2",
            target: "Node 1",
            label: {
              show: true,
            },
            lineStyle: {
              curveness: 0.2,
            },
          },
          {
            source: "Node 1",
            target: "Node 3",
          },
          {
            source: "Node 2",
            target: "Node 3",
          },
          {
            source: "Node 2",
            target: "Node 4",
          },
          {
            source: "Node 1",
            target: "Node 4",
          },
        ],
        lineStyle: {
          opacity: 0.9,
          width: 2,
          curveness: 0,
        },
      },
    ],
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}
</script>

<style scoped>
#main {
  width: 100%;
  height: 400px;
}
</style>

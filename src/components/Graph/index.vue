<template>
  <div ref="main" id="main"></div>
</template>
<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
//API
import { searchStudentByNameES } from "../../api/chart.js";
const { proxy } = getCurrentInstance();
//  按需引入 echarts
const main = ref(); // 使用ref创建虚拟DOM引用，使用时用main.value
onMounted(() => {
  searchStudentByNameES()
    .then((res) => {
      console.log("searchStudentByNameES-res", res);
      chartData.value = res.data;
    })
    .then(() => {
      init();
    });
});
const chartData = ref([]);
const keyword = "之";

const getLinksData = (arr) => {
  const linksData = [];
  arr.forEach((item) => {
    linksData.push({
      source: keyword,
      target: item.studentName,
    });
    if (item.studentData.length) {
      item.studentData.forEach((stu) => {
        linksData.push({
          source: item.studentName,
          target: stu.sName,
        });
      });
    }
  });
  return linksData;
};
const getNodePosition = (arr, r) => {
  console.log("arr", arr);
  const nodes = [
    {
      name: keyword,
      x: 0,
      y: 0,
    },
  ];
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    const theta = (2 * Math.PI * i) / len;
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);
    nodes.push({
      name: arr[i].studentName,
      x: x,
      y: y,
    });
    if (arr[i].studentData.length) {
      // 计算子节点的半径偏移量
      const childTheta = theta + Math.PI / 2; // 子节点相对于父节点的角度偏移
      const childX = r * Math.cos(childTheta);
      const childY = r * Math.sin(childTheta);

      arr[i].studentData.forEach((stu) => {
        nodes.push({
          name: stu.sName,
          x: childX,
          y: childY,
        });
      });
    }
  }
  console.log("nodes", nodes);
  return nodes;
};

function init() {
  // 基于准备好的dom，初始化echarts实例
  var myChart = proxy.$echarts.init(main.value);
  // 指定图表的配置项和数据
  var option = {
    title: {
      text: "",
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
        data: getNodePosition(chartData.value, 150),
        links: getLinksData(chartData.value),
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
  height: 600px;
}
</style>

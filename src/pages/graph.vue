<template>
  <div>
    <h2 class="graph-title">校园智慧助手 - 知识图谱</h2>
    <div>
      <svg id="svg"></svg>
    </div>
  </div>
</template>

<script setup>
import * as d3 from "d3";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { searchStudentByNameES } from "../api/chart.js";
const route = useRoute();
const keyword = route.query.keyword; // 获取所有查询参数
console.log("keyword", keyword);
let svg = ref(null);
let simulation = ref(null);
let nodes = ref(null);
let links = ref(null);
let graphData = ref(null);

const chartData = ref({
  nodes: [
    {
      name: keyword,
    },
  ],
  links: [],
});

onMounted(() => {
  fetchData();
  window.addEventListener("resize", updateSVGSize);
});

const fetchData = () => {
  searchStudentByNameES(keyword)
    .then((res) => {
      console.log("searchStudentByNameES-res", res.data);
      graphData.value = res.data;
    })
    .then(() => {
      initGraph();
      addNodes();
      addLinks();
      drawLinks();
      drawNodes();
    });
};

const initGraph = () => {
  const width = window.innerWidth || document.documentElement.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight;

  svg.value = d3.select("svg").attr("width", width).attr("height", height);

  // 创建缩放行为
  const zoomHandler = d3
    .zoom()
    .scaleExtent([1, 8]) // 设置缩放的最小和最大值
    .on("zoom", zoomed); // 绑定缩放事件

  // 将缩放行为应用到SVG的g元素上
  svg.value.call(zoomHandler);

  let s = d3
    .forceSimulation()
    .force("charge_force", d3.forceManyBody().strength(-1000))
    .force("center_force", d3.forceCenter(width / 2, height / 2 - 20))
    .on("tick", ticked);

  simulation.value = s;
  svg.value.append("s");
};

// 响应式调整SVG尺寸
const updateSVGSize = () => {
  const width = window.innerWidth || document.documentElement.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight;
  svg.value.attr("width", width).attr("height", height);
  simulation.value.force(
    "center_force",
    d3.forceCenter(width / 2, height / 2 - 20)
  );
  // svg.value.select(".nodes").selectAll("*").remove();
  // svg.value.select(".links").selectAll("*").remove();
  // drawLinks();
  // drawNodes();
};

// 缩放事件处理函数
const zoomed = (event) => {
  // 应用缩放变换到所有的图形元素
  svg.value.select(".nodes").attr("transform", event.transform);
  svg.value.select(".links").attr("transform", event.transform);
};

const addNodes = () => {
  graphData.value.forEach((item, index) => {
    chartData.value.nodes.push({ name: item.studentName });

    chartData.value.links.push({
      source: 0,
      target: 1 + 8 * index,
    });

    if (item.studentData.length) {
      item.studentData.forEach((val) => {
        chartData.value.nodes.push({ name: `辅导员:${val.sAdvisor}` });
        chartData.value.nodes.push({ name: `年龄:${val.sAge}` });
        chartData.value.nodes.push({ name: `编号:${val.sId}` });
        chartData.value.nodes.push({ name: `姓名:${val.sName}` });
        chartData.value.nodes.push({ name: `学号:${val.sNum}` });
        chartData.value.nodes.push({ name: `手机号:${val.sPhone}` });
        chartData.value.nodes.push({ name: `性别:${val.sSex}` });
        for (let i = 1; i <= 7; i++) {
          chartData.value.links.push({
            source: 1 + 8 * index,
            target: 1 + 8 * index + i,
          });
        }
      });
    }
  });
  simulation.value.nodes(chartData.value.nodes);
};

const addLinks = () => {
  // 为第一层链接设置较短的距离
  const firstLevelLinks = chartData.value.links.filter(
    (link) => link.source === 0
  );
  const firstLevelLinkForce = d3.forceLink(firstLevelLinks).distance(20);
  simulation.value.force("first_level_link", firstLevelLinkForce);

  // 为第二层链接设置较长的距离
  const secondLevelLinks = chartData.value.links.filter(
    (link) => link.source !== 0
  );
  const secondLevelLinkForce = d3.forceLink(secondLevelLinks).distance(150);
  simulation.value.force("second_level_link", secondLevelLinkForce);

  // const linkForce = d3.forceLink(chartData.value.links).distance(100);
  // simulation.value.force("link", linkForce);
};

const drawNodes = () => {
  const nodeGroup = svg.value.append("g").classed("nodes", true);
  nodes.value = nodeGroup
    .selectAll("circle")
    .data(chartData.value.nodes)
    .enter()
    .append("g");
  nodes.value.append("circle").classed("circle", true).attr("r", 30);
  nodes.value
    .append("text")
    .text(function (d) {
      return d.name;
    })
    .style("text-anchor", "middle")
    .style("font-weight", "bold")
    .style("font-size", "12px")
    .html(function (d) {
      return d.name;
    });
};

const drawLinks = () => {
  const linkGroup = svg.value.append("g").classed("links", true);
  links.value = linkGroup
    .selectAll("line")
    .data(chartData.value.links)
    .enter()
    .append("line")
    .classed("link", true);
};

const ticked = () => {
  links.value
    .attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y);
  nodes.value.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  nodes.value.attr("transform", function (d) {
    return "translate(" + d.x + "," + d.y + ")";
  });
};
</script>

<style>
.graph-title {
  font-size: 20px;
  font-weight: 700;
  color: rgb(98, 144, 133);
  margin-top: 12px;
}

#svg {
  width: 100vw;
  height: 100vh;
}

.circle {
  fill: #fff;
  stroke: rgb(110, 161, 149);
}

.link {
  stroke: rgb(110, 161, 149);
  stroke-width: 2px;
}
</style>

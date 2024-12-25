<template>
  <div>
    <h2>每个年龄段的平均购买金额</h2>
    <div
      ref="chartRef"
      style="width: 100%; height: 400px; border: 1px solid #ccc"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import * as echarts from "echarts";

// 图表容器引用
const chartRef = ref(null);
let chartInstance = null;

// 渲染图表
const renderChart = data => {
  if (!chartInstance) return;

  const sortedData = data.sort((a, b) => a.Age.localeCompare(b.Age));
  const ages = sortedData.map(item => item.Age);
  const averages = sortedData.map(item => item.AveragePurchase);

  const options = {
    title: {
      text: "每个年龄段的平均购买金额",
      left: "center"
    },
    tooltip: {
      trigger: "axis"
    },
    xAxis: {
      type: "category",
      data: ages,
      axisLabel: {
        rotate: 45
      }
    },
    yAxis: {
      type: "value",
      name: "平均购买金额"
    },
    series: [
      {
        data: averages,
        type: "bar",
        name: "平均购买金额",
        color: "#5470C6"
      }
    ]
  };

  chartInstance.setOption(options);
};

// 使用 Pinia Store
import { useChart2DataStore } from "../../store/data/chart2";
const chartDataStore = useChart2DataStore();

onMounted(async () => {
  await nextTick(); // 等待 DOM 渲染完成

  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value);

    // 从 Pinia 中获取数据
    const data = await chartDataStore.fetchAveragePurchaseData();
    renderChart(data);
  }
});

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose();
  }
});
</script>

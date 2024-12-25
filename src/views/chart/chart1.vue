<template>
  <div>
    <h2>折线图</h2>
    <div
      ref="chartRef"
      style="width: 100%; height: 400px; border: 1px solid #ccc"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import * as echarts from "echarts";
import { getDetailPurchaseByAge } from "@/api/data"; // 确保该路径正确

// 图表容器引用
const chartRef = ref(null);
let chartInstance = null;

// 使用 Pinia Store
import { useChart1DataStore } from "../../store/data/chart1";
const chartDataStore = useChart1DataStore();

onMounted(async () => {
  await nextTick(); // 等待 DOM 渲染完成
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value);

    // 从 Pinia 中获取数据
    const data = await chartDataStore.fetchDetailPurchaseByAge();
    renderChart(data);
  }
});

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose();
  }
});

// 渲染图表
const renderChart = data => {
  if (!chartInstance) return;

  const sortedData = data.sort((a, b) => a.Age.localeCompare(b.Age));
  const ages = sortedData.map(item => item.Age);
  const averagePurchases = sortedData.map(item => item.AveragePurchase);
  const maxPurchases = sortedData.map(item => item.MaxPurchase);
  const medianPurchases = sortedData.map(item => item.MedianPurchase);

  const options = {
    title: { text: "每个年龄段的购买数据", left: "center" },
    tooltip: { trigger: "axis" },
    legend: { data: ["平均值", "最大值", "中位值"] },
    grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
    toolbox: { feature: { saveAsImage: {} } },
    xAxis: { type: "category", boundaryGap: false, data: ages },
    yAxis: { type: "value", name: "购买金额" },
    series: [
      { name: "平均值", type: "line", data: averagePurchases },
      { name: "最大值", type: "line", data: maxPurchases },
      { name: "中位值", type: "line", data: medianPurchases }
    ]
  };

  chartInstance.setOption(options);
};
</script>

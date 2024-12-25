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
import { getAveragePurchaseByAge } from "@/api/data";

// 图表容器引用
const chartRef = ref(null);
let chartInstance = null;

// 获取数据函数
const fetchAveragePurchaseByAge = async () => {
  try {
    const response = await getAveragePurchaseByAge();
    console.log("Response data:", response);
    if (response.success) {
      return response.data;
    } else {
      console.error("Failed to fetch data:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return [];
  }
};

// 获取数据函数
// const fetchAveragePurchaseByAge = async () => {
//   console.log("fetchAveragePurchaseByAge is called");
//   try {
//     const response = await fetch(
//       "http://localhost:3000/getAveragePurchaseByAge",
//       {
//         method: "GET", // 如果是 POST，需改为 "POST"
//         headers: {
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log("Response data:", data);

//     if (data.success) {
//       return data.data;
//     } else {
//       console.error("Failed to fetch data:", data.message);
//       return [];
//     }
//   } catch (error) {
//     console.error("Error fetching chart data:", error);
//     return [];
//   }
// };

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

// 挂载生命周期
onMounted(async () => {
  console.log("onMounted triggered");
  await nextTick(); // 等待 DOM 渲染完成
  if (chartRef.value) {
    console.log("chartRef.value exists");
    chartInstance = echarts.init(chartRef.value);
    const data = await fetchAveragePurchaseByAge();
    renderChart(data);
  } else {
    console.warn("chartRef.value is null");
  }
});

// 卸载生命周期
onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose();
  }
});
</script>

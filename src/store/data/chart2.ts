// store/data/chart2.ts
import { defineStore } from "pinia";
import { getAveragePurchaseByAge } from "@/api/data";

export const useChart2DataStore = defineStore("chart2Data", {
  state: () => ({
    averagePurchaseData: [], // 存储每个年龄段的平均购买数据
    isDataFetched: false // 标志是否已经请求过数据
  }),

  actions: {
    async fetchAveragePurchaseData() {
      if (this.isDataFetched) {
        console.log("Data2 already fetched. Returning cached data2.");
        return this.averagePurchaseData;
      }

      try {
        const response = await getAveragePurchaseByAge();
        console.log(response);
        if (response.success) {
          this.averagePurchaseData = response.data;
          this.isDataFetched = true; // 设置为已请求过数据
        } else {
          console.error("Failed to fetch data2:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching chart data2:", error);
      }

      return this.averagePurchaseData;
    }
  }
});

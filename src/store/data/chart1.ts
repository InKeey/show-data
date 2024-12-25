// store/data/chart2.ts
import { defineStore } from "pinia";
import { getDetailPurchaseByAge } from "@/api/data";

export const useChart1DataStore = defineStore("chart1Data", {
  state: () => ({
    detailPurchaseByAge: [], // 存储每个年龄段的细节购买数据
    isDataFetched: false // 标志是否已经请求过数据
  }),

  actions: {
    async fetchDetailPurchaseByAge() {
      if (this.isDataFetched) {
        console.log("Data1 already fetched. Returning cached data1.");
        return this.DetailPurchaseByAge;
      }

      try {
        const response = await getDetailPurchaseByAge();
        console.log(response);
        if (response.success) {
          this.DetailPurchaseByAge = response.data;
          this.isDataFetched = true; // 设置为已请求过数据
        } else {
          console.error("Failed to fetch data1:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching chart data1:", error);
      }

      return this.DetailPurchaseByAge;
    }
  }
});

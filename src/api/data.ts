import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

/*获取后端可视化数据*/
// 封装获取后端可视化数据的方法
export const getDetailPurchaseByAge = () => {
  return http.request<any>("get", baseUrlApi("getDetailPurchaseByAge"));
};

export const getAveragePurchaseByAge = () => {
  return http.request<any>("get", baseUrlApi("getAveragePurchaseByAge"));
};

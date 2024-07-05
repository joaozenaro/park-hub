import api from "./api";

const BASE_PATH = "/dashboard";

export interface IFinanceResponse {
  amount_today: number;
  average_amount_week: number;
  amount_week: number;
  average_amount_month: number;
  amount_month: number;
  average_amount_year: number;
  amount_by_spot_type: {
    spotType: string;
    total_price: string;
  }[];
}
interface ISearchDashboardHistoryModel {
  spot_type_period: "week" | "month" | "year";
}
function finance(data?: ISearchDashboardHistoryModel) {
  return api.post<IFinanceResponse>(BASE_PATH + "/history", data);
}

export const dashboardService = {
  finance,
};

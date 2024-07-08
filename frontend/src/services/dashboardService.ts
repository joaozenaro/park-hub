import api from "./api";

const BASE_PATH = "/dashboard";

export interface IFinanceResponse {
  amount_today: string;
  average_amount_week: string;
  amount_week: string;
  average_amount_month: string;
  amount_month: string;
  average_amount_year: string;
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

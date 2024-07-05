import { useEffect, useState } from "react";
import { useToast } from "../useToast";
import {
  dashboardService,
  IFinanceResponse,
} from "../../services/dashboardService";
import { TOAST_MESSAGES } from "../../constants/toastMessages";

export default function useFinancesData() {
  const { launchToast } = useToast();
  const [timeRangeFilter, setTimeRangeFilter] = useState("week");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IFinanceResponse | null>(null);

  useEffect(() => {
    dashboardService
      .finance()
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        launchToast({
          title: TOAST_MESSAGES.COMMON.LIST_ERROR_TITLE,
          description: TOAST_MESSAGES.COMMON.ERROR_DESCRIPTION,
          type: "error",
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const getGrowthPercentageBetween = (number1: number, number2: number) => {
    return Number((number1 / number2) * 100 - 100).toFixed(0);
  };

  return {
    timeRangeFilter,
    setTimeRangeFilter,
    loading,
    data,
    getGrowthPercentageBetween,
  };
}

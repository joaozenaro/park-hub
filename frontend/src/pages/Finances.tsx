import Content from "../components/layout/Content";
import Heading from "../components/ui/Heading";
import { Text } from "../components/ui/Text";
import { printStringDate } from "../utils/date/printStringDate";
import _ from "lodash";
import { PieChart } from "../components/ui/PieChart";
import { useEffect, useState } from "react";
import {
  dashboardService,
  IFinanceResponse,
} from "../services/dashboardService";
import { toCurrency } from "../utils/toCurrency";
import { ToggleGroup } from "../components/ui/ToggleGroup";
import { useToast } from "../hooks/useToast";
import { TOAST_MESSAGES } from "../constants/toastMessages";

export default function Finances() {
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
  return (
    <Content>
      <div className="flex">
        <Heading>Financeiro</Heading>
        <div className="ml-auto align-middle">
          <Text> {printStringDate()}</Text>
        </div>
      </div>
      {data && (
        <div className="flex space-x-6 mt-8">
          <div className="flex flex-[3] flex-col space-y-6 justify-start">
            <div className="border p-6 rounded-md space-y-4">
              <h2 className="font-semibold">Total hoje</h2>
              <p className="text-3xl font-semibold">
                {toCurrency(data.amount_today)}
              </p>
              <Text>
                {getGrowthPercentageBetween(
                  data.amount_today,
                  data.average_amount_week
                )}
                % da média semanal
              </Text>
            </div>
            <div className="border rounded-md p-6 space-y-6">
              <h2 className="font-semibold">Total semanal (ultimos 7 dias )</h2>
              <p className="text-3xl font-semibold">
                {toCurrency(data.amount_week)}
              </p>
              <Text>
                {getGrowthPercentageBetween(
                  data.amount_week,
                  data.average_amount_month
                )}
                % da média mensal
              </Text>
            </div>
            <div className="border rounded-md p-6 space-y-6">
              <h2 className="font-semibold">Total mensal</h2>
              <p className="text-3xl font-semibold">
                {toCurrency(data.amount_month)}
              </p>
              <Text>
                {getGrowthPercentageBetween(
                  data.amount_month,
                  data.average_amount_year
                )}
                % da média anual
              </Text>
            </div>
          </div>
          <div className="border rounded-md p-6 space-y-4">
            <h2 className="font-semibold">Total por tipo de vaga</h2>
            <div className="">
              <ToggleGroup
                value={timeRangeFilter}
                onChangeValue={setTimeRangeFilter}
                options={[
                  { label: "7d", value: "week" },
                  { label: "30d", value: "month" },
                  { label: "12m", value: "year" },
                ]}
                aria-label="Selecionar período de tempo"
              />
            </div>
            <div className="w-[400px] h-[360px]">
              <PieChart
                data={data.amount_by_spot_type.map((item) => ({
                  type: item.spotType,
                  value: Number(item.total_price),
                }))}
              />
            </div>
          </div>
        </div>
      )}
    </Content>
  );
}

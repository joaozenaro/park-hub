import Content from "../components/layout/Content";
import Heading from "../components/ui/Heading";
import { Text } from "../components/ui/Text";
import { printStringDate } from "../utils/date/printStringDate";
import _ from "lodash";
import { PieChart } from "../components/ui/PieChart";
import { toCurrency } from "../utils/toCurrency";
import { ToggleGroup } from "../components/ui/ToggleGroup";
import useFinancesData from "../hooks/finance/useFinancesData";
import { Card } from "../components/ui/Card";
import { TIME_RANGE_OPTIONS } from "../constants";
import clsx from "clsx";
import { useMemo } from "react";

export default function Finances() {
  const {
    data,
    getGrowthPercentageBetween,
    timeRangeFilter,
    setTimeRangeFilter,
  } = useFinancesData();

  const dataCards = useMemo(
    () =>
      data
        ? [
            {
              title: "Total hoje",
              value: data.amount_today,
              growthPercentage: getGrowthPercentageBetween(
                data.amount_today,
                data.average_amount_week
              ),
              growthText: "da média semanal",
            },
            {
              title: "Total semanal (ultimos 7 dias)",
              value: data.amount_week,
              growthPercentage: getGrowthPercentageBetween(
                data.amount_week,
                data.average_amount_month
              ),
              growthText: "da média mensal",
            },
            {
              title: "Total mensal (ultimos 30 dias)",
              value: data.amount_month,
              growthPercentage: getGrowthPercentageBetween(
                data.amount_month,
                data.average_amount_year
              ),
              growthText: "da média anual",
            },
          ]
        : [],
    [data]
  );

  return (
    <Content>
      <div className="flex">
        <Heading>Financeiro</Heading>
        <div className="ml-auto align-middle">
          <Text> {printStringDate(new Date())}</Text>
        </div>
      </div>
      {data && (
        <div className="flex space-x-6 mt-8">
          <div className="flex flex-[3] flex-col space-y-6 justify-start">
            {dataCards.map((item) => (
              <Card key={item.title} className="space-y-6">
                <Heading size="xs">{item.title}</Heading>
                <p className="text-3xl font-semibold">
                  {toCurrency(item.value)}
                </p>
                {item.growthPercentage !== 0 && (
                  <p
                    className={clsx("text-sm", {
                      "text-red-600": item.growthPercentage < 0,
                      "text-emerald-600": item.growthPercentage > 0,
                    })}
                  >
                    {item.growthPercentage}%{" "}
                    {item.growthPercentage > 0 ? "acima" : "abaixo"}{" "}
                    {item.growthText}
                  </p>
                )}
              </Card>
            ))}
          </div>
          <Card className="space-y-6">
            <Heading size="xs">Total por tipo de vaga</Heading>
            <div className="">
              <ToggleGroup
                value={timeRangeFilter}
                onChangeValue={setTimeRangeFilter}
                options={TIME_RANGE_OPTIONS}
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
          </Card>
        </div>
      )}
    </Content>
  );
}

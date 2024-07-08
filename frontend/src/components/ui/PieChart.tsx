import { Pie } from '@ant-design/plots';

interface Props {
  data: { type: string, value: number }[];
}

export function PieChart({
  data,
}: Props) {
  const config = {
    data,

    angleField: 'value',
    colorField: 'type',
    paddingBottom: 40,
    innerRadius: 0.6,
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        title: true,
        position: 'left',
        rowPadding: 5,
      },
    },
  };
  return <Pie {...config} />;
};
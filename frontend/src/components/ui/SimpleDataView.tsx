import { ReactNode } from "react";
import { Text } from "./Text";

interface Props {
  data: { value: string | ReactNode; label: string }[];
}
export default function SimpleDataView({ data }: Props) {
  return (
    <div className="bg-slate-100 p-4 rounded-md w-full">
      <table>
        <tbody>
          {data.map((item) => (
            <tr key={item.label}>
              <td className="text-right py-1">
                <Text>{item.label}</Text>
              </td>
              <td className="pl-4 py-1">
                <Text asChild>
                  <p className="text-zinc-900 ">{item.value}</p>
                </Text>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import Content from "../components/layout/Content";
import Heading from "../components/ui/Heading";
import { Text } from "../components/ui/Text";
import { printStringDate } from "../utils/date/printStringDate";
import { Button } from "../components/ui/Button";
import {
  MdOutlineCalendarToday,
} from "react-icons/md";
import _ from "lodash";
import { PieChart } from "../components/ui/PieChart";

export default function Finances() {
  return (
    <Content>
      <div className="flex">
        <Heading>Financeiro</Heading>
        <div className="ml-auto align-middle">
          <Text> {printStringDate()}</Text>
        </div>
      </div>
      <div className="flex space-x-3 pt-8">
        <Button type="secondary"> <MdOutlineCalendarToday /> Selecionar datas</Button>
        <Button type="tertiary">Limpar filtros</Button>
      </div>
      <div className="flex space-x-6 pt-16 justify-start">
        <div className="border p-6 rounded-md flex-1 space-y-4">
          <h2 className="font-semibold">Total hoje</h2>
          <p className="text-3xl font-semibold">R$143 </p>
          <Text>aa</Text>
        </div>
        <div className="border p-6 rounded-md flex-1 space-y-4">
          <h2 className="font-semibold">Total semanal</h2>
          <p className="text-3xl font-semibold">R$143 </p>
          <Text>aa</Text>
        </div>
        <div className="border p-6 rounded-md flex-1 space-y-4">
          <h2 className="font-semibold">Total mensal</h2>
          <p className="text-3xl font-semibold">R$143 </p>
          <Text>aa</Text>
        </div>
      </div>

      <div className="flex pt-16 justify-start h-[190px] space-x-6 ">
        <div className="border p-2 rounded-md flex-[2] h-[350px]">
          <h2 className="font-semibold">Arrecadação</h2>
        </div>
        <div className="border p-2 rounded-md flex-[1] h-[350px]">
          <h2 className="font-semibold">Total por tipo de vaga</h2>
          <PieChart data={
            [
              { type: 'Carro', value: 20 },
              { type: 'Moto', value: 25 },
              { type: 'Especial', value: 18 },
              { type: 'Bicicleta', value: 1 },
            ]
          } />

        </div>
      </div>
    </Content>
  );
}
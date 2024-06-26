import Content from "../components/layout/Content";
import Heading from "../components/ui/Heading";
import { Text } from "../components/ui/Text";
import { printStringDate } from "../utils/date/printStringDate";
import { Button } from "../components/ui/Button";
import {
  MdOutlineCalendarToday,
} from "react-icons/md";
import _ from "lodash";


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
      <div className="flex space-x-6 pt-16 justify-start h-[190px]">
        <div className="border p-2 rounded-md w-[500px]">
          <h2 className="font-semibold">Total hoje</h2>
          <Heading>R$</Heading>
        </div>
        <div className="border p-2 rounded-md w-[470px]">
          <h2 className="font-semibold">Total semanal</h2>
          <Heading>R$</Heading>
        </div>
        <div className="border p-2 rounded-md w-[500px]">
          <h2 className="font-semibold">Total mensal</h2>
          <Heading>R$</Heading>
        </div>
      </div>

      <div className="flex pt-16 justify-start h-[190px] space-x-6 ">
        <div className="border p-2 rounded-md w-[1000px] h-[350px]">
          <h2 className="font-semibold">Arrecadação</h2>
        </div>
        <div>
          <div className="justify-end border p-2 rounded-md w-[500px] h-[350px]">
            <h2 className="font-semibold">Arrecadação</h2>
          </div>
        </div>
      </div>
    </Content>
  );
}
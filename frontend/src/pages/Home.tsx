import {
  MdOutlineFilterAlt,
  MdOutlineLayers,
  MdOutlineSearch,
} from "react-icons/md";
import { FormControl } from "../components/form/FormControl";
import { TextInput } from "../components/form/TextInput";
import { Button } from "../components/ui/Button";
import Heading from "../components/ui/Heading";
import { Text } from "../components/ui/Text";
import _ from "lodash";
import { Select } from "../components/form/Select";
import { useState } from "react";
import { Dialog } from "../components/ui/Dialog";
import { AlertDialog } from "../components/ui/AlertDialog";

export default function Home() {
  const [floor, setFloor] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const SPOTS_COLUMNS = 12;
  const spots = [
    { id: 1, code: "A1" },
    { id: 2, code: "A2" },
    { id: 3, code: "A3" },
    { id: 4, code: "A4" },
    { id: 5, code: "A5" },
    { id: 6, code: "A6" },
    { id: 7, code: "A7" },
    { id: 8, code: "A8" },
    { id: 9, code: "A9" },
    { id: 10, code: "A10" },
    { id: 11, code: "A11" },
    { id: 12, code: "A12" },
    { id: 13, code: "A13" },
    { id: 14, code: "A14" },
    { id: 15, code: "A15" },
    { id: 16, code: "A16" },
    { id: 17, code: "A17" },
    { id: 18, code: "A18" },
    { id: 19, code: "A19" },
    { id: 20, code: "A20" },
    { id: 21, code: "A21" },
    { id: 22, code: "A22" },
    { id: 23, code: "A23" },
    { id: 24, code: "A24" },
    { id: 25, code: "A25" },
    { id: 26, code: "A26" },
    { id: 27, code: "A27" },
    { id: 29, code: "A29" },
    { id: 30, code: "A30" },
    { id: 31, code: "A31" },
    { id: 32, code: "A32" },
    { id: 33, code: "A33" },
    { id: 34, code: "A34" },
    { id: 35, code: "A35" },
  ];

  const selectItems = [
    { value: "1", label: "SUB1" },
    { value: "2", label: "SUB2" },
    { value: "3", label: "SUB3" },
    { value: "4", label: "SUB4" },
  ];

  const parkingLots = _.chunk(spots, SPOTS_COLUMNS * 2);

  return (
    <div className="flex flex-1">
      <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
        <Dialog.Content title="Nova reserva">
          <Text>Eia eia eia</Text>
        </Dialog.Content>
      </Dialog.Root>

      <div className="flex flex-1 flex-col bg-slate-200 p-10 space-y-10">
        <div>
          <div className="flex mb-6">
            <Heading>Seu estacionamento</Heading>
            <Text asChild>
              <p className="text-[1.5rem] font-bold ml-auto flex items-center">
                <MdOutlineLayers className="h-6 w-6 mr-2" /> SUB1
              </p>
            </Text>
          </div>

          <Text>Total de 60 vagas. Tipo: Todos. Disponibilidade: Todos </Text>
        </div>

        {parkingLots.map((spots, index) => (
          <div key={index} className="flex">
            <div className="border-4 rounded-tl-2xl rounded-bl-2xl h-full w-8 border-white" />
            <div className="border-white border-t-4 border-b-4">
              <ul className={`grid grid-cols-${SPOTS_COLUMNS} -mr-1 -mb-1`}>
                {spots.map((spot) => (
                  <li
                    key={spot.id}
                    className="border-white border-r-4 border-b-4"
                  >
                    <div className="bg-teal-200 w-[70px] h-[128px]"></div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-4 rounded-tr-2xl rounded-br-2xl h-full w-8 border-white" />
          </div>
        ))}
      </div>
      <div className="w-[20rem] h-[--content-height] sticky top-[4rem] bg-white">
        <div className="border-b h-11 flex items-center border-slate-300 px-8">
          <Heading size="xs">Gerenciar vagas</Heading>
        </div>
        <div className="p-8 space-y-8">
          <Heading size="xs" asChild>
            <h3 className="flex space-x-2">
              Filtros <MdOutlineFilterAlt className="h-6 w-6" />
            </h3>
          </Heading>

          <FormControl id="plate" label="Pesquise por placa" errors={[]}>
            <TextInput.Root>
              <TextInput.Icon>
                <MdOutlineSearch />
              </TextInput.Icon>
              <TextInput.Input
                value={""}
                onChange={(e) => {}}
                placeholder="Digite a placa..."
                required
              />
            </TextInput.Root>
          </FormControl>
          <FormControl id="pass" label="Andar" errors={[]}>
            <Select.Root
              value={floor}
              onChange={setFloor}
              placeholder="Selecione o andar"
            >
              <Select.Item value={null}>Selecione o andar</Select.Item>
              {selectItems.map((item) => (
                <Select.Item value={item.value} key={item.value}>
                  {item.label}
                </Select.Item>
              ))}
            </Select.Root>
          </FormControl>
          <Button type="tertiary">Limpar filtros</Button>
        </div>
        <div className="p-8 pt-0 space-y-4">
          <Heading size="xs" asChild>
            <h3>Ações</h3>
          </Heading>

          <Button
            className="w-full items-start"
            onClick={() => setOpenModal(true)}
          >
            Nova reserva
          </Button>
          <AlertDialog
            title="Deletar reserva"
            description="Esta ação não poderá ser desfeita. Você realmente deseja deletar essa reserva?"
            okText="Sim, deletar"
            onConfirm={() => {}}
          >
            <Button type="secondary" className="w-full">
              Registrar saída
            </Button>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}

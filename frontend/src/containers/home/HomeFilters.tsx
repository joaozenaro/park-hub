import { MdOutlineFilterAlt, MdOutlineSearch } from "react-icons/md";
import Heading from "../../components/ui/Heading";
import { FormControl } from "../../components/form/FormControl";
import { TextInput } from "../../components/form/TextInput";
import { useState } from "react";
import { Text } from "../../components/ui/Text";
import { Dialog } from "../../components/ui/Dialog";
import { Select } from "../../components/form/Select";
import { Button } from "../../components/ui/Button";
import { AlertDialog } from "../../components/ui/AlertDialog";

export default function HomeFilters() {
  const [floor, setFloor] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const selectItems = [
    { value: "1", label: "SUB1" },
    { value: "2", label: "SUB2" },
    { value: "3", label: "SUB3" },
    { value: "4", label: "SUB4" },
  ];

  return (
    <div className="w-[20rem] h-[--content-height] sticky top-[4rem] bg-white">
      <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
        <Dialog.Content title="Nova reserva" description="qqr coisa kaksdska">
          <Text>Eia eia eia</Text>
        </Dialog.Content>
      </Dialog.Root>

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
  );
}

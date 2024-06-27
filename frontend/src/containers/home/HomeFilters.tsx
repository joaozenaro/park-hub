import {
  MdOutlineAdd,
  MdOutlineFilterAlt,
  MdOutlineFilterAltOff,
  MdOutlineLogout,
  MdOutlineSearch,
} from "react-icons/md";
import Heading from "../../components/ui/Heading";
import { FormControl } from "../../components/form/FormControl";
import { TextInput } from "../../components/form/TextInput";
import { Select } from "../../components/form/Select";
import { Button } from "../../components/ui/Button";
import { ISearchSpotReservationModel } from "../../services/spotService";

interface Props {
  filters: ISearchSpotReservationModel;
  setFilters: (filters: ISearchSpotReservationModel) => void;
  onOpenCheckinForm: () => void;
  onApplyFilters: () => void;
  floors: string[];
}
export default function HomeFilters({
  floors,
  filters,
  setFilters,
  onApplyFilters,
  onOpenCheckinForm,
}: Props) {
  const floorOptions = floors.map((f) => ({ value: f, label: f }));
  return (
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
              value={filters.license_plate}
              onChange={(e) =>
                setFilters({ ...filters, license_plate: e.target.value })
              }
              placeholder="Digite a placa..."
              required
            />
          </TextInput.Root>
        </FormControl>
        <FormControl id="pass" label="Andar" errors={[]}>
          <Select.Root
            value={filters.floor}
            onChange={(value: string) =>
              setFilters({ ...filters, floor: value })
            }
            placeholder="Selecione o andar"
          >
            <Select.Item value={null}>Selecione o andar</Select.Item>
            {floorOptions.map((item) => (
              <Select.Item value={item.value} key={item.value}>
                {item.label}
              </Select.Item>
            ))}
          </Select.Root>
        </FormControl>
        <Button
          type="tertiary"
          onClick={() => {
            setFilters({
              floor: "",
              license_plate: "",
            });
          }}
        >
          <MdOutlineFilterAltOff className="h-5 w-5 mr-2" />
          Limpar filtros
        </Button>
        <Button className="w-full" onClick={onApplyFilters}>
          <MdOutlineFilterAlt className="h-5 w-5 mr-2" />
          Aplicar filtros
        </Button>
      </div>
      <div className="p-8 pt-0 space-y-4">
        <Heading size="xs" asChild>
          <h3>Ações</h3>
        </Heading>

        <Button
          className="w-full items-start"
          onClick={() => onOpenCheckinForm()}
        >
          <MdOutlineAdd className="h-5 w-5 mr-2" />
          Nova reserva
        </Button>
        <Button type="secondary" className="w-full">
          <MdOutlineLogout className="h-5 w-5 mr-2" />
          Registrar saída
        </Button>
      </div>
    </div>
  );
}

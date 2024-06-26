import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { Table } from "../../components/ui/Table";
import { ISpotType } from "../../models/ISpotType";
import { toCurrency } from "../../utils/toCurrency";

interface Props {
  data: ISpotType[];
  loading: boolean;
  onUpdate: (spotType: ISpotType) => void;
  onDelete: (id: number) => void;
}
export default function SpotTypesTable({
  data,
  loading,
  onDelete,
  onUpdate,
}: Props) {
  return (
    <Table.Root>
      <Table.Table>
        <thead>
          <tr>
            <Table.Th className="text-start">#</Table.Th>
            <Table.Th className="text-start">Name</Table.Th>
            <Table.Th className="text-start">Preço padrão</Table.Th>
            <Table.Th className="text-end w-[40px]">Ações</Table.Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          <Table.LoadingRow loading={loading} repeat={3}>
            <Table.LoadingTd />
            <Table.LoadingTd />
            <Table.LoadingTd />
          </Table.LoadingRow>
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-slate-100">
              <Table.Td>{item.id}</Table.Td>
              <Table.Td className="capitalize">{item.name}</Table.Td>
              <Table.Td>{toCurrency(Number(item.default_price))}</Table.Td>
              <Table.Td>
                <Table.ActionsDropdown>
                  <Table.ActionItem>
                    <button
                      onClick={() => {
                        onUpdate(item);
                      }}
                      className="text-slate-500 disabled:opacity-50 px-2 text-sm leading-4 rounded-md flex w-full items-center h-8 select-none outline-0 data-[highlighted]:bg-slate-100 data-[highlighted]:text-zinc-900"
                    >
                      <MdOutlineEdit className="h-5 w-5 mr-2" />{" "}
                      <span>Editar</span>
                    </button>
                  </Table.ActionItem>

                  <Table.ActionItem>
                    <button
                      onClick={() => {
                        onDelete(item.id);
                      }}
                      className="text-red-500 px-2 text-sm leading-4 rounded-md flex w-full items-center h-8 select-none outline-0 data-[highlighted]:bg-slate-100 data-[highlighted]:text-red-700"
                    >
                      <MdOutlineDelete className="h-5 w-5 mr-2 text-current" />{" "}
                      <span>Excluir</span>
                    </button>
                  </Table.ActionItem>
                </Table.ActionsDropdown>
              </Table.Td>
            </tr>
          ))}
        </tbody>
      </Table.Table>
      <Table.EmptyData visible={!data.length && !loading} />
    </Table.Root>
  );
}

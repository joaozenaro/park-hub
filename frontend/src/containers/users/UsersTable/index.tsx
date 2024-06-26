import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import Avatar from "../../../components/ui/Avatar";
import { Table } from "../../../components/ui/Table";
import { IUser } from "../../../models/IUser";
import { printDate } from "../../../utils/date/printDate";
import Tag from "../../../components/ui/Tag";
import { IPagination } from "../../../hooks/usePagination";

interface Props {
  data: IUser[];
  pagination: IPagination;
  loading: boolean;
  onUpdate: (user: IUser) => void;
  onDelete: (id: number) => void;
}
export default function UsersTable({
  data,
  pagination,
  loading,
  onDelete,
  onUpdate,
}: Props) {
  return (
    <Table.Root>
      <Table.Table>
        <thead>
          <tr>
            <Table.Th className="text-start">Nome</Table.Th>
            <Table.Th className="text-start">Email</Table.Th>
            <Table.Th className="text-start w-[200px]">Status</Table.Th>
            <Table.Th className="text-start w-[200px]">Criado em</Table.Th>
            <Table.Th className="text-start w-[200px]">Editado em</Table.Th>
            <Table.Th className="text-start w-[100px]">Foto</Table.Th>
            <Table.Th className="text-end w-[40px]">Ações</Table.Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          <Table.LoadingRow loading={loading} repeat={5}>
            <Table.LoadingTd />
            <Table.LoadingTd />
            <Table.LoadingTd />
            <Table.LoadingTd />
          </Table.LoadingRow>
          {data.map((user) => (
            <tr className="hover:bg-slate-100">
              <Table.Td>{user.name || "Usuário sem nome"}</Table.Td>
              <Table.Td>{user.email}</Table.Td>
              <Table.Td>
                <Tag type={user.status ? "success" : "danger"}>
                  {user.status ? "Ativo" : "Inativo"}
                </Tag>
              </Table.Td>
              <Table.Td>{printDate(user.created_at)}</Table.Td>
              <Table.Td>{printDate(user.updated_at)}</Table.Td>
              <Table.Td>
                <Avatar name={user?.name || "Sem Nome"} url={user?.avatar} />
              </Table.Td>
              <Table.Td>
                <Table.ActionsDropdown>
                  <Table.ActionItem>
                    <button
                      onClick={() => {
                        onUpdate(user);
                      }}
                      disabled={!user.status}
                      className="text-slate-500 disabled:opacity-50 px-2 text-sm leading-4 rounded-md flex w-full items-center h-8 select-none outline-0 data-[highlighted]:bg-slate-100 data-[highlighted]:text-zinc-900"
                    >
                      <MdOutlineEdit className="h-5 w-5 mr-2" />{" "}
                      <span>Editar</span>
                    </button>
                  </Table.ActionItem>

                  <Table.ActionItem>
                    <button
                      onClick={() => {
                        onDelete(user.id);
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
      <Table.Pagination pagination={pagination}/>
    </Table.Root>
  );
}

import {
  MdAdd,
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineSearch,
} from "react-icons/md";
import Content from "../components/layout/Content";
import { Button } from "../components/ui/Button";
import Heading from "../components/ui/Heading";
import { TextInput } from "../components/form/TextInput";
import { useCallback, useEffect, useState } from "react";
import SignupDialog from "../containers/signup/SignupDialog";
import { Table } from "../components/ui/Table";
import Tag from "../components/ui/Tag";
import { IUser } from "../models/IUser";
import { userService } from "../services/userService";
import { printDate } from "../utils/date/printDate";
import Avatar from "../components/ui/Avatar";
import { debounce } from "lodash";
import { useToast } from "../hooks/useToast";

export default function Users() {
  const { launchToast } = useToast();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<IUser[]>([]);

  const debouncedSearch = useCallback(
    debounce((text) => {
      userService
        .search({ searchTerm: text })
        .then((res) => {
          setData(res.data);
        })
        .catch(() => {
          launchToast({
            title: "Erro ao buscar dados",
            description:
              "Verifique sua conexão com a internet e tente novamente.",
            type: "error",
          });
        });
    }, 700),
    []
  );

  useEffect(() => {
    userService
      .search()
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        launchToast({
          title: "Erro ao buscar dados",
          description:
            "Verifique sua conexão com a internet e tente novamente.",
          type: "error",
        });
      });
  }, []);

  useEffect(() => {
    debouncedSearch(searchText);
  }, [searchText]);

  return (
    <Content>
      <SignupDialog open={createModalOpen} onOpenChange={setCreateModalOpen} />
      <Heading>Usuários</Heading>
      <div className="flex mt-8">
        <div className="w-full max-w-[500px] mr-8">
          <TextInput.Root>
            <TextInput.Icon>
              <MdOutlineSearch />
            </TextInput.Icon>
            <TextInput.Input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Pesquisar por nome"
              required
            />
          </TextInput.Root>
        </div>
        <Button
          className="ml-auto h-10"
          onClick={() => setCreateModalOpen(true)}
        >
          <MdAdd className="h-6 w-6" />
          Criar usuário
        </Button>
      </div>
      <div className="mt-8">
        <Table.Root>
          <thead>
            <tr>
              <Table.Th className="text-start">Nome</Table.Th>
              <Table.Th className="text-start w-[200px]">Status</Table.Th>
              <Table.Th className="text-start w-[200px]">Criado em</Table.Th>
              <Table.Th className="text-start w-[200px]">Editado em</Table.Th>
              <Table.Th className="text-start w-[100px]">Foto</Table.Th>
              <Table.Th className="text-end w-[40px]">Ações</Table.Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {data.map((user) => (
              <tr className="hover:bg-slate-100">
                <Table.Td>{user.name || "Usuário sem nome"}</Table.Td>
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
                          console.log("setEditModal to true");
                        }}
                        className="text-slate-500 px-2 text-sm leading-4 rounded-md flex w-full items-center h-8 select-none outline-0 data-[highlighted]:bg-slate-100 data-[highlighted]:text-zinc-900"
                      >
                        <MdOutlineEdit className="h-5 w-5 mr-2 text-zinc-900" />{" "}
                        <span>Editar</span>
                      </button>
                    </Table.ActionItem>

                    <Table.ActionItem>
                      <button
                        onClick={() => {
                          console.log("deletar");
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
        </Table.Root>
      </div>
    </Content>
  );
}

import {
  MdAdd,
  MdDelete,
  MdEdit,
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineSearch,
} from "react-icons/md";
import Content from "../components/layout/Content";
import { Button } from "../components/ui/Button";
import Heading from "../components/ui/Heading";
import { TextInput } from "../components/form/TextInput";
import { useState } from "react";
import SignupDialog from "../containers/signup/SignupDialog";
import { Table } from "../components/ui/Table";
import Tag from "../components/ui/Tag";

const fakeData = [
  {
    id: 1,
    name: "João Silva",
    role: "admin",
    avatar:
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    created_at: "2024-06-22T23:46:00-03:00",
  },
  {
    id: 2,
    name: "Pedro Costa",
    role: "admin",
    avatar:
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    created_at: "2024-06-22T23:46:00-03:00",
  },
  {
    id: 3,
    name: "Neusa Amaral",
    role: "employee",
    avatar:
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    created_at: "2024-06-22T23:46:00-03:00",
  },
];
export default function Users() {
  const [createModalOpen, setCreateModalOpen] = useState(false);

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
              value={""}
              onChange={() => {}}
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
              <Table.Th className="text-start w-[200px]">Função</Table.Th>
              <Table.Th className="text-start w-[200px]">
                Adicionado em
              </Table.Th>
              <Table.Th className="text-start w-[100px]">Foto</Table.Th>
              <Table.Th className="text-end w-[40px]">Ações</Table.Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {fakeData.map((user) => (
              <tr className="hover:bg-slate-100">
                <Table.Td>{user.name}</Table.Td>
                <Table.Td>
                  <Tag>{user.role}</Tag>
                </Table.Td>
                <Table.Td> 18 de junho</Table.Td>
                <Table.Td>
                  <img src={user.avatar} alt={"Foto de " + user.name} />
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

import { MdAdd, MdOutlineSearch } from "react-icons/md";
import Content from "../components/layout/Content";
import { Button } from "../components/ui/Button";
import Heading from "../components/ui/Heading";
import { TextInput } from "../components/form/TextInput";
import { useState } from "react";
import SignupDialog from "../containers/signup/SignupDialog";

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
    </Content>
  );
}

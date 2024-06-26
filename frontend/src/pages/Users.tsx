import { MdAdd, MdOutlineSearch } from "react-icons/md";
import Content from "../components/layout/Content";
import { Button } from "../components/ui/Button";
import Heading from "../components/ui/Heading";
import { TextInput } from "../components/form/TextInput";
import SignupDialog from "../containers/signup/SignupDialog";
import UpdateUserDialog from "../containers/users/UpdateUserDialog";
import { useUsersPageData } from "../hooks/users/useUsersPageData";
import UsersTable from "../containers/users/UsersTable";

export default function Users() {
  const {
    userToUpdate,
    setUserToUpdate,
    handleDeleteUser,
    createModalOpen,
    setCreateModalOpen,
    data,
    refreshData,
    searchText,
    setSearchText,
    pagination,
    loading,
  } = useUsersPageData();

  return (
    <Content>
      {userToUpdate && (
        <UpdateUserDialog
          user={userToUpdate}
          open={!!userToUpdate}
          onClose={() => setUserToUpdate(null)}
          onSuccess={refreshData}
        />
      )}
      <SignupDialog
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSuccess={refreshData}
      />
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
        <UsersTable
          data={data}
          onUpdate={setUserToUpdate}
          onDelete={handleDeleteUser}
          loading={loading}
          pagination={pagination}
        />
      </div>
    </Content>
  );
}

import Content from "../components/layout/Content";
import { useAuth } from "../contexts/AuthContext";
import UpdateUserForm from "../containers/users/UpdateUserForm";
import Heading from "../components/ui/Heading";
import { Text } from "../components/ui/Text";
import { ROLES_LABEL } from "../constants";
import Avatar from "../components/ui/Avatar";

export default function Profile() {
  const { user } = useAuth();
  return (
    <Content>
      <div className="flex">
        <Heading>Perfil</Heading>
      </div>
      <Text>Configurações do perfil</Text>

      <div className="mt-2 space-y-4 mb-5">
        <h4 className="font-bold">Foto do perfil</h4>

        <div className="flex items-center">
          <Avatar name={user?.name || ""} url={user?.avatar} size="lg" />

          <div className="ml-6">
            <p className="font-bold">{user?.name}</p>
            <Text>{ROLES_LABEL[user?.role.name as "employee" | "admin"]}</Text>
          </div>
        </div>
      </div>
      <div className="max-w-[700px]">
        <UpdateUserForm
          isProfile
          id={Number(user?.id)}
          initialData={{
            username: user?.username || "",
            name: user?.name || "",
            avatar: user?.avatar || "",
          }}
        />
      </div>
    </Content>
  );
}

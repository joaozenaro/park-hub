import Content from "../components/layout/Content";
import { useAuth } from "../contexts/AuthContext";
import ProfileForm from "../containers/ProfileForm";
import Heading from "../components/ui/Heading";
import { Button } from "../components/ui/Button";
import { Text } from "../components/ui/Text";
import * as Avatar from '@radix-ui/react-avatar';
import { getInitials } from "../utils/getInitials";
import { ROLES_LABEL } from "../constants";
import { Link } from "react-router-dom";


export default function Profile() {
  const { user } = useAuth();
  console.log(user?.role.name);
  return (

    <Content>
      <div className="flex">
        <Heading>Perfil</Heading>
      </div>
      <Text>Configurações do perfil</Text>

      <div className="mt-2 space-y-4 mb-5">
        <h4 className="font-bold">Foto do perfil</h4>

        <div className="flex items-center">
          <Avatar.Root className="inline-flex h-[70px] w-[70px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
            <Avatar.Image
              className="h-full w-full rounded-[inherit] object-cover"
              src={user?.avatar}
              alt={"Avatar de " + user?.name}
            />
            <Avatar.Fallback
              className=" text-white leading-1 flex h-full w-full items-center justify-center bg-amber-500 text-[20px] font-semibold"
              delayMs={600}
            >
              {getInitials(user?.name || '')}
            </Avatar.Fallback>
          </Avatar.Root>

          <div className="ml-6">
            <p className="font-bold">{user?.name}</p>
            <Text>{ROLES_LABEL[user?.role.name as ('employee' | 'admin')]}</Text>
          </div>

        </div>

      </div>

      <div className="max-w-[700px]">
        <ProfileForm initialData={{ username: user?.username || '', name: user?.name || '', avatar: user?.avatar || '' }} />
      </div>
    </Content>




  )
}
import { Button } from "../components/ui/Button";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  return (
    <div>
      <h1>Perfil</h1>
      <p>{user?.name}</p>
      <p>{user?.avatar}</p>
      <p>{user?.email}</p>
      <p>{user?.status}</p>
      <Button>
        Editar
      </Button>
    </div>
  )
}
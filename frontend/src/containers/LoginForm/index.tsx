import { useForm } from "../../hooks/useForm";
import { ILoginForm } from "../../models/ILoginForm";
import { isValidLogin } from "./validation";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/Button";
import { Loading } from "../../components/ui/Loading";
import SmartFormFields from "../../components/form/SmartFormFields";
import { fields } from "./fields";

const defaultData = {
  username: "",
  password: "",
};
export default function LoginForm() {
  const { handleLogin } = useAuth();

  const { data, loading, errors, handleChangeValue, handleSubmit } =
    useForm<ILoginForm>({
      defaultData,
      onSubmit: handleLogin,
      validator: isValidLogin,
    });
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <SmartFormFields 
        fields={fields}
        data={data}
        errors={errors}
        onChangeValue={handleChangeValue}
      />
      <Button type="brand" className="w-full justify-center mt-6">
        {loading && <Loading size="sm" className="mr-2" />}
        Entrar
      </Button>
    </form>
  );
}

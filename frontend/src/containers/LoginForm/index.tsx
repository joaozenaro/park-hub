import { useForm } from "../../hooks/useForm";
import { ILoginForm } from "../../models/ILoginForm";
import { isValidLogin } from "./validation";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/Button";
import { Loading } from "../../components/ui/Loading";
import SmartFormFields from "../../components/form/SmartFormFields";
import { loginFormFields } from "./loginFormFields";

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
        fields={loginFormFields}
        data={data}
        errors={errors}
        onChangeValue={handleChangeValue}
      />
      <Button type="brand" className="w-full justify-center mt-6">
        {loading && <Loading size="sm" />}
        Entrar
      </Button>
    </form>
  );
}

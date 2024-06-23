import { Link } from "react-router-dom";
import CenteredCard from "../components/layout/CenteredCard";
import Logo from "../components/ui/Logo";
import LoginForm from "../containers/LoginForm";

export default function Login() {
  return (
    <CenteredCard>
      <h1 className="text-4xl font-medium flex items-center justify-center mb-2 mt-8">
        Login
      </h1>
      <LoginForm />
      <Link
        to="/esqueceu-sua-senha"
        className="group flex justify-center text-slate-500 hover:underline outline-none pt-5"
      >
        Esqueceu a senha?
      </Link>
      <div className="flex justify-center mt-10">
        <Logo />
      </div>
    </CenteredCard>
  );
}

import { Link } from "react-router-dom";
import CenteredCard from "../components/layout/CenteredCard";
import PasswordResetForm from "../containers/PasswordResetForm";
import { MdArrowBack } from "react-icons/md";
import Logo from "../components/ui/Logo";

export default function PasswordReset() {
  return (

    <CenteredCard>
      <h1 className="text-4xl font-medium flex items-center justify-center mb-2 mt-8">Redefinição de senha</h1>
      <PasswordResetForm />
      <Link to="/login" className="group flex justify-center text-slate-500 hover:underline outline-none mt-5"> <MdArrowBack className="h-6 w-6 mr-1 text-zinc-900 group-hover:text-amber-500 " />  Voltar para o Login </Link>
      <div className="flex justify-center mt-10">
        <Logo />
      </div>
    </CenteredCard>

  )
}
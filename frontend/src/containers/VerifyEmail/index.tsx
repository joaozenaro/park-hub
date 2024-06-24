import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { MdArrowBack, MdOutlineEmail } from "react-icons/md";
import Logo from "../../components/ui/Logo";
import CenteredCard from "../../components/layout/CenteredCard";

interface Props {
  email: string;
  onGoBack: () => void;
}

export default function VerifyEmail({ email, onGoBack }: Props) {
  return (
    <CenteredCard>
      <MdOutlineEmail className="w-8 h-8 inline items-center justify-center ml-auto mr-auto mb-6" />
      <h1 className="text-4xl font-medium flex items-center justify-center">Verifique seu Email</h1>
      <h4 className="font-normal text-gray-400 flex justify-center text-center pt-3">Um link para trocar a senha foi enviado para  </h4>
      <p className="flex items-center justify-center pb-6">{email}</p>
      <Link to="//gmail.com" >
        <Button type="brand" className="w-full justify-center">
          Abrir Email
        </Button>
      </Link>
      <h4 className="font-normal text-gray-400 flex justify-center text-center pt-6">Não recebeu o email? &#160;< Link to="/esqueceu-sua-senha" onClick={() => onGoBack()} className="text-amber-500 hover:text-amber-600" > Clique para reenviar </Link></h4>
      <div className="flex min-w-0 max-w-45 justify-center">
        <Link to="/Login" className="group mt-6 flex justify-center text-slate-500 hover:underline outline-none"> <MdArrowBack className="h-6 w-6 mr-1 text-zinc-900 group-hover:text-amber-500 " />  Voltar para o Login </Link>
      </div>
      <div className="flex justify-center mt-10">
         <Logo />
      </div>
    </CenteredCard>
  )
}

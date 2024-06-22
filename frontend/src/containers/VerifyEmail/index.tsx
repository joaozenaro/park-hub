import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { MdArrowBack, MdCircle, MdOutlineEmail } from "react-icons/md";

interface Props {
  email: string;
  onGoBack: () => void;
}

export default function VerifyEmail({ email, onGoBack }: Props) {
  return (
    <div className="max-w-lg m-auto flex flex-col bg-white p-8 rounded-xl shadow shadow-slate-300 ">
      <MdOutlineEmail className="w-8 h-8 inline items-center justify-center m-auto mb-6" />
      <h1 className="text-4xl font-medium flex items-center justify-center">Verifique seu Email</h1>
      <h4 className="font-normal text-gray-400 flex justify-center text-center pt-3">Um link para trocar a senha foi enviado para  </h4>
      <p className="flex items-center justify-center pb-6">{email}</p>
      <Link to="//gmail.com" className="flex justify-center items-center">
        <Button type="brand">
          Enviar Email
        </Button>
      </Link>
      <h4 className="font-normal text-gray-400 flex justify-center text-center pt-6">Não recebeu o email? &#160;< Link to="/esqueceu-sua-senha" onClick={() => onGoBack()} className="text-amber-500 hover:text-amber-600" > Clique para reenviar </Link></h4>
      <div className="flex min-w-0 max-w-45 justify-center">
        <Link to="/Login" className="group flex justify-center pt-6 text-slate-500 hover:underline outline-none"> <MdArrowBack className="h-6 w-6 mr-1 text-zinc-900 group-hover:text-amber-500 " />  Voltar para o Login </Link>
      </div>
    </div>
  )
}

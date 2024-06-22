import { FormEvent, useState } from "react";
import { authService } from "../services/authService";
import axios, { AxiosError } from "axios";
import { IApiErrorResponse } from "../models/IApiResponse";
import { Button } from "../components/ui/Button";
import { FormControl } from "../components/form/FormControl";
import { TextInput } from "../components/form/TextInput";
import VerifyEmail from "../containers/VerifyEmail";
import { Link } from "react-router-dom";
import { MdArrowBack, MdOutlineEmail } from "react-icons/md";
import Logo from "../components/ui/Logo";
import { useToast } from "../hooks/useToast";
import CenteredCard from "../components/layout/CenteredCard";

export default function ForgotPassword() {
  const {launchToast} = useToast();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await authService.requestPasswordChange(email)
      .then((res: any) => {
        if (res.data?.message) {
          console.log(res.data.message)
          setMessage("Verifique seu email");
        }
      })
      .catch((err: AxiosError<IApiErrorResponse>) => {
        if (axios.isAxiosError(err) && err.response) {
          launchToast({
            title: "Erro ao enviar o email",
            description: "Verifque se o email foi digitado corretamente!",
            type: "error",
          });
        } else {
          console.log('erro');
        }
      })
  }

  return (
    <div className="flex flex-1 bg-zinc-900">
      {!message && (
        <CenteredCard>
          <h1 className="text-4xl font-medium flex items-center justify-center">Esqueceu a senha?</h1>
          <h4 className="font-normal mt-2 text-gray-400 flex items-center text-center justify-center pt-3">Preencha seu email para enviarmos seu link de recuperação de senha</h4>
          <form action="" className="my-10" onSubmit={onSubmit}>
            <div className="flex flex-col space-y-5">
              <FormControl id="email" label="Email" errors={[]}>
                <TextInput.Root>
                  <TextInput.Icon>
                    <MdOutlineEmail />
                  </TextInput.Icon>
                  <TextInput.Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite o seu email."
                    required
                  />
                </TextInput.Root>
              </FormControl>
              <Button type="brand" className="justify-center">
                Enviar
              </Button>
              <div className="flex min-w-0 max-w-45 justify-center">
                <Link to="/login" className="group flex justify-center text-slate-500 hover:underline outline-none "> <MdArrowBack className="h-6 w-6 mr-1 text-zinc-900 group-hover:text-amber-500 " />  Voltar para o Login </Link>
              </div>
            </div>
          </form>
          <div className="flex justify-center">
            <Logo />
          </div>
        </CenteredCard>
      )}
      {message && <VerifyEmail onGoBack={() => setMessage('')} email={email} />}
    </div>
  )

}
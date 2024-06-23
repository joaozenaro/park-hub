import { useNavigate } from "react-router-dom";
import CenteredCard from "../components/layout/CenteredCard";
import Heading from "../components/ui/Heading";
import Logo from "../components/ui/Logo";
import CompleteSignupForm from "../containers/signup/CompleteSignupForm";
import { Text } from "../components/ui/Text";
import { Link } from "react-router-dom";

export default function CompleteSignup() {
  const navigate = useNavigate();
  return (
    <CenteredCard fixedHeight={false}>
      <Heading asChild>
        <h1 className="mb-2">Realize seu cadastro</h1>
      </Heading>
      <Text asChild>
        <p className="mb-4">
          Já possui uma conta?{" "}
          <Link
            to="/login"
            className="group text-amber-500 font-bold hover:underline outline-none "
          >
            Fazer Login
          </Link>
        </p>
      </Text>

      <Text asChild>
        <p className="mb-4">Preencha as informações para poder fazer o login</p>
      </Text>

      <CompleteSignupForm
        onSuccess={() => {
          navigate("/login");
        }}
      />
      <div className="flex justify-center mt-10">
        <Logo />
      </div>
    </CenteredCard>
  );
}

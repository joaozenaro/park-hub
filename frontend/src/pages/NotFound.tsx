import Lottie from "lottie-react";
import notFoundAnimation from "../assets/animations/not-found.json";
import Logo from "../components/ui/Logo";
import Heading from "../components/ui/Heading";
import { Link } from "react-router-dom";
import { MdOutlineLogin } from "react-icons/md";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Logo />
      <div className="w-[28rem] h-[28rem] mt-12">
        <Lottie animationData={notFoundAnimation} loop />
      </div>
      <Heading>Página não encontrada</Heading>
      <Link to="/login">
        <button className="flex mt-8 hover:underline">
          <MdOutlineLogin className="h-6 w-6 mr-4 " />
          Faça seu login para aproveitar as maravilhas dessa plataforma
        </button>
      </Link>
    </div>
  );
}

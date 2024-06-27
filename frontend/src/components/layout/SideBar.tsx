import { IconType } from "react-icons";
import {
  MdOutlineAttachMoney,
  MdOutlineDirectionsCar,
  MdOutlineHome,
  MdOutlineLocalParking,
  MdOutlinePerson,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Logo from "../ui/Logo";
import clsx from "clsx";
import usePermission from "../../hooks/usePermission";

interface MenuItem {
  Icon: IconType;
  label: string;
  path: string;
  role?: string;
}
interface Props {
  menus?: MenuItem[];
}

const defaultMenus: MenuItem[] = [
  { Icon: MdOutlineHome, label: "Home", path: "/" },
  // {
  //   Icon: MdOutlineDirectionsCar,
  //   label: "Fluxo de veículos",
  //   path: "/fluxo-de-veiculos",
  // },
  { Icon: MdOutlineAttachMoney, label: "Financeiro", path: "/financeiro" },
  {
    Icon: MdOutlinePerson,
    label: "Usuários",
    path: "/usuarios",
    role: "admin",
  },
  {
    Icon: MdOutlineLocalParking,
    label: "Vagas",
    path: "/vagas",
    role: "admin",
  },
];
export default function SideBar({ menus = defaultMenus }: Props) {
  const location = useLocation();
  const { hasRole } = usePermission();
  return (
    <div className="relative flex flex-col space-y-6 bg-clip-border  bg-zinc-900 text-white h-full w-full max-w-[18rem] px-4 shadow-xl shadow-blue-gray-900/5">
      <div className="px-2 py-4">
        <Logo />
      </div>

      <nav className="flex flex-col gap-1 w-full font-sans text-base font-normal text-white ">
        {menus.filter(menuItem => !menuItem.role || hasRole(menuItem.role)).map((menuItem) => (
          <Link key={menuItem.label} to={menuItem.path}>
            <button
              tabIndex={0}
              className={clsx(
                "flex items-center h-10 w-full p-2 rounded-md text-start leading-tight  hover:bg-zinc-800 outline-none ",
                {
                  "text-amber-500 bg-zinc-800 font-bold":
                    location.pathname == menuItem.path,
                }
              )}
            >
              <div className="grid place-items-center mr-4">
                <menuItem.Icon className="w-6 h-6" />
              </div>
              {menuItem.label}
            </button>
          </Link>
        ))}
      </nav>
    </div>
  );
}

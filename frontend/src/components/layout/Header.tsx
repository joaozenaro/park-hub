import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MdKeyboardArrowDown, MdLogout, MdOutlinePerson } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import * as Avatar from '@radix-ui/react-avatar';
import { getInitials } from "../../utils/getInitials";

export default function Header() {
  const { user, handleLogout } = useAuth();
  return (
    <div className="h-16 shrink-0 border-b border-slate-300 bg-white sticky top-0 z-10 flex items-center px-8">
      <div className="ml-auto">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="flex outline-0 items-center space-x-3 rounded-md hover:bg-slate-100 p-1">
              <Avatar.Root className="inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full align-middle">
                <Avatar.Image
                  className="h-full w-full rounded-[inherit] object-cover"
                  src={user?.avatar}
                  alt={"Avatar de " + user?.name}
                />
                <Avatar.Fallback
                  className=" text-white leading-1 flex h-full w-full items-center justify-center bg-amber-500 text-[15px] font-semibold"
                  delayMs={600}
                >
                  {getInitials(user?.name || '')}
                </Avatar.Fallback>
              </Avatar.Root>
              <div className="flex flex-col items-start">
                <p className="text-zinc-900 font-bold text-sm">
                  {user?.name}
                </p>
                <p className="text-slate-500 text-xs">{user?.email}</p>
              </div>
              <MdKeyboardArrowDown className="h-6 w-6 text-slate-500" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-56 mr-8 z-20 bg-white rounded-md p-2 shadow-[0px_10px_38px_-10px_rgba(0,_0,_0,_0.4),_0px_8px_16px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
              sideOffset={8}
            >
              <DropdownMenu.Item asChild>
                <Link
                  to="/profile"
                  className="text-slate-500 px-2 text-sm leading-4 rounded-md flex items-center h-8 select-none outline-none data-[highlighted]:bg-slate-100 data-[highlighted]:text-zinc-900 outline-0"
                >
                  <MdOutlinePerson className="h-5 w-5 mr-2 text-zinc-900" />
                  <span>Perfil</span>
                </Link>
              </DropdownMenu.Item>

              <DropdownMenu.Separator className="h-[1px] bg-slate-200 my-2" />

              <DropdownMenu.Item asChild>
                <button
                  onClick={() => handleLogout()}
                  className="text-slate-500 px-2 text-sm leading-4 rounded-md flex w-full items-center h-8 select-none outline-none data-[highlighted]:bg-slate-100 data-[highlighted]:text-zinc-900"
                >
                  <MdLogout className="h-5 w-5 mr-2 text-zinc-900" />{" "}
                  <span>Sair</span>
                </button>
              </DropdownMenu.Item>

              <DropdownMenu.Arrow className="fill-white" />
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  );
}

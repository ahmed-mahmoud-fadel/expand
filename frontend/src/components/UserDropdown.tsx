'use client'

import { FiLogOut } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import logout from "@/actions/logout";
import { setCookie } from "@/global/cookie";

const UserDropdown = ({
  user,
}: {
  user: {
    firstName: string,
    lastName: string,
    photo?: string,
  }
}) => {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user.photo} />
          <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Button
        variant={"destructive"}
        className="gap-2"
        onClick={async () => {
          const data = await logout()
          if (data.valid) {
            setCookie('jwt', 'none', { expires: 1, path: '/' })
            setCookie('id', 'none', { expires: 1, path: '/' })
            router.push('/')
          } else {
            setCookie('jwt', 'none', { expires: 1, path: '/' })
            setCookie('id', 'none', { expires: 1, path: '/' })
            window.alert(`Logout failed. message: ${data.message}`)
          }
        }}
        >
          <FiLogOut />
          Log out
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
 
export default UserDropdown;
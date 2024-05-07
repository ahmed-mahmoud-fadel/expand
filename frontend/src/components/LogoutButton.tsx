'use client'

import logout from "@/actions/logout";
import { Button } from "./ui/button";
import { setCookie } from "@/global/cookie";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter()
  return (
    <Button
      variant={"destructive"}
      className="gap-2"
      onClick={async () => {
        const data = await logout()
        if (data.valid) {
          setCookie('jwt', 'none', { expires: 1, path: '/' })
          setCookie('id', 'none', { expires: 1, path: '/' })
          location.assign('/')
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
  );
}

export default LogoutButton;
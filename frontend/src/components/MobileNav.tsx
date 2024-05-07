"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { IoMenu } from "react-icons/io5";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { Button } from "./ui/button";

const MobileNav = ({
  loggedIn
}: {
  loggedIn?: boolean
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="block lg:hidden"
      >
        <IoMenu />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute top-0 right-0">
        <DropdownMenuItem>
          <Link href="/demo">
            Demo
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/viewer">
            3D Viewer
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/products">
            Products
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/blog">
            Blog
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/contact">
            Contact Us
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {
          loggedIn &&
          <>
            <DropdownMenuItem>
              <Link href="/dashboard">
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutButton />
            </DropdownMenuItem>
          </>
        }
        {
          !loggedIn &&
          <>
            <DropdownMenuItem>
              <Link href="/login">
                Log in
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/signup">
                Get Started
              </Link>
            </DropdownMenuItem>
          </>
        }

      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MobileNav;
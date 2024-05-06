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

const MobileNav = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
      className="block md:hidden"
      >
        <IoMenu />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute top-0 right-0">
        <DropdownMenuLabel>Models</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/models/glasses">
            Glasses
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/models/watches">
            Watches
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/models/shoes">
            Shoes
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
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
          <Link href="/blog">
            Blog
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
 
export default MobileNav;
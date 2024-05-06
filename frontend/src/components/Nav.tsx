"use client"

import {
  NavigationMenu,
  NavigationMenuTrigger,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import Link from "next/link";

const Nav = () => {
  return (
    <div className="lg:flex gap-5 hidden">
      <NavigationMenu>
        <NavigationMenuList className="text-[#8a38a6] dark:text-[#c95ced]">

          <NavigationMenuItem>
            <Link href="/demo" legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
              >
                Demo
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/viewer" legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
              >
                3D Viewer
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/products" legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
              >
                Products
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        
          <NavigationMenuItem>
            <Link href="/blog" legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
              >
                Blog
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
              >
                Contact Us
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>

      <Link href="/login">
        <Button variant="secondary">Log in</Button>
      </Link>
      <Link href="/signup">
        <Button className="text-white font-bold">Get Started</Button>
      </Link>
    </div>
  );
}
 
export default Nav;
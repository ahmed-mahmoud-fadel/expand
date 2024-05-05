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
    <div className="md:flex gap-5 hidden">
      <NavigationMenu>
        <NavigationMenuList className="text-[#8a38a6] dark:text-[#c95ced]">
        
          <NavigationMenuItem>
            <NavigationMenuTrigger>Models</NavigationMenuTrigger>
            <NavigationMenuContent>
              <Link href="/models/glasses" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Glasses</NavigationMenuLink>
              </Link>
              <Link href="/models/watches" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Watches</NavigationMenuLink>
              </Link>
              <Link href="/models/shoes" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Shoes</NavigationMenuLink>
              </Link>
            </NavigationMenuContent>
          </NavigationMenuItem>
        

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
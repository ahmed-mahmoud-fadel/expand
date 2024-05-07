import ThemeButton from "./ThemeButton";
import Link from "next/link";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { Button } from "./ui/button";
import { FaRegEnvelope } from "react-icons/fa"
import Brand from "./Brand";
import { cookies } from "next/headers";
import LogoutButton from "./LogoutButton";

const Header = ({
  loggedIn
}: {
  loggedIn?: boolean
}) => {
  return (
    <header className="flex justify-between items-center px-10 py-2">
      <Link href="/">
        <Brand />
      </Link>
      <Nav/>
      <div className="hidden lg:block">
      {
        loggedIn &&
        <div className="flex gap-4">
        <Link href="/dashboard">
          <Button variant="secondary">Dashboard</Button>
        </Link>
        <LogoutButton />
        </div>
      }
      {
        !loggedIn &&
        <div className="flex gap-4">
        <Link href="/login">
          <Button variant="secondary">Log in</Button>
        </Link>
        <Link href="/signup">
          <Button className="text-white font-bold">Get Started</Button>
        </Link>
        </div>
      }
      </div>
      <div className="flex gap-2">
        <ThemeButton />
        <MobileNav loggedIn={loggedIn} />
      </div>
    </header>
  );
}
 
export default Header;
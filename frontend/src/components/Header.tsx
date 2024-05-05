import ThemeButton from "./ThemeButton";
import Link from "next/link";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { Button } from "./ui/button";
import { FaRegEnvelope } from "react-icons/fa"
import Brand from "./Brand";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-10 py-2">
      <Link href="/">
        <Brand />
      </Link>
      <Nav />
      <Link href="#contact" className="block md:hidden">
        <Button className="text-white">
          <div className="hidden md:block">Contact Us</div>
          <div className="block md:hidden">
            <FaRegEnvelope />
          </div>
        </Button>
      </Link>
      <div className="flex gap-2">
        <ThemeButton />
        <MobileNav />
      </div>
    </header>
  );
}
 
export default Header;
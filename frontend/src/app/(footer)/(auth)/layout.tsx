import Brand from "@/components/Brand";
import Link from "next/link"
import Image from "next/image";
import loginBanner from '@/global/img/login-banner.png'

const AuthLayout = ({
  children
} : {
  children: React.ReactNode
}) => {
  return (
    <div className="gap-5 flex-1 flex flex-col w-full h-full">
      <div className="grid grid-cols-1 w-full h-full md:grid-cols-2">
        <Image className="hidden md:block w-full h-full object-cover" src={loginBanner} alt="Authentication Banner" />
        <div className="flex flex-col gap-24 py-6 justify-center">
          <header className="flex flex-col gap-7 items-center justify-center p-5">
            <Link href="/">
              <Brand size={2} />
            </Link>
          </header>
          <div className="px-8 sm:px-20">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default AuthLayout;
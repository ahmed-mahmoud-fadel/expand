import { CollapsibleNavLink } from "@/components/CollapsibleSideNav";
import DashboardSidebar from "../DashboardSidebar";
import Brand from "@/components/Brand";
import { Input } from "@/components/ui/input";
import ThemeButton from "@/components/ThemeButton";
import { FaMoneyBill, FaQuestion, FaUser, FaWrench } from "react-icons/fa";
import '../dashboard.css'
import dashboardRouting from "../routing";
import endpoints from "@/global/endpoints";
import { cookies } from "next/headers";
import UserDropdown from "@/components/UserDropdown";
import Link from "next/link";

const AdminDashboardLayout = async ({
  children
}: {
  children: React.ReactNode
}) => {
  await dashboardRouting('user')

  const cookieStore = cookies()
  const jwt = cookieStore.get('jwt')
  const id = cookieStore.get('id')

  const response = await fetch(`${endpoints.users}/${id?.value}`, {
    next: {
      revalidate: 0,
    },
    headers: {
      "Authorization": `Bearer ${jwt?.value}`
    }
  })

  if (!response.ok) {
    throw new Error(`Unable to fetch user data.`)
  }

  const user = await response.json()

  const links: CollapsibleNavLink[] = [
    {
      text: "Profile",
      href: '/dashboard/user',
      icon: <FaUser />,
    },
    {
      text: "Subscriptions",
      href: '/dashboard/user/subscriptions',
      icon: <FaMoneyBill />,
    },
    {
      text: "Support",
      href: '/contact',
      icon: <FaQuestion />,
    },
  ]

  return (
    <div className="flex h-full w-full overflow-clip">
      <DashboardSidebar links={links} />
      <div className="flex flex-col w-full h-full">
        <header className="flex justify-between items-center p-2 border-b">
          <a href="/" className="w-max">
            <Brand />
          </a>
          <Input placeholder="Search" className="w-96" />
          <div className="flex gap-4">
            <ThemeButton />
            <UserDropdown user={user} />
          </div>
        </header>
        <div className="p-5 overflow-y-scroll w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardLayout;
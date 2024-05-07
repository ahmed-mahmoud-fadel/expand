import { CollapsibleNavLink } from "@/components/CollapsibleSideNav";
import DashboardSidebar from "../DashboardSidebar";
import Brand from "@/components/Brand";
import { Input } from "@/components/ui/input";
import ThemeButton from "@/components/ThemeButton";
import { FaHome, FaUser, FaSearch, FaNewspaper, FaDollarSign, FaVideo, FaTag } from "react-icons/fa";
import { FaMessage, FaP } from "react-icons/fa6";
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
  await dashboardRouting('admin')

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
      text: "Home",
      href: '/dashboard/admin',
      icon: <FaHome />,
    },
    {
      text: "User Management",
      href: "/dashboard/admin/user-management",
      icon: <FaUser />,
    },
    // {
    //   text: "Analytics",
    //   href: "/dashboard/admin/analytics",
    //   icon: <FaSearch />,
    // },
    {
      text: "Products",
      href: "/dashboard/admin/products",
      icon: <FaTag />,
    },
    {
      text: "Blog Management",
      href: "/dashboard/admin/blog-management",
      icon: <FaNewspaper />,
    },
    {
      text: "Pricing Plans",
      href: "/dashboard/admin/pricing-plans",
      icon: <FaP />,
    },
    {
      text: "Subscriptions",
      href: "/dashboard/admin/subscriptions",
      icon: <FaDollarSign />,
    },
    {
      text: "Messages",
      href: "/dashboard/admin/messages",
      icon: <FaMessage />,
    },
    {
      text: "Solutions",
      href: "/dashboard/admin/solutions",
      icon: <FaVideo />,
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
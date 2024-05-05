"use client"

import CollapsibleSideNav, { CollapsibleNavLink } from "@/components/CollapsibleSideNav";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { FaAlignLeft, FaChevronLeft } from "react-icons/fa";

const DashboardSidebar = ({
  links,
}: {
  links: CollapsibleNavLink[]
}) => {
  const pathname = usePathname()

  return (
    <CollapsibleSideNav
      links={links}
      render={(nav, toggleFunction, state) => (
        <>
        <div className="py-2 border-b">
          <Button
          variant="outline"
          className="w-max"
          onClick={toggleFunction}
          >
            {
              state &&
              <FaChevronLeft />
            }
            {
              !state &&
              <FaAlignLeft />
            }
          </Button>
        </div>
        {nav}
        </>
      )}
      selectedIndex={links.findLastIndex(v => pathname.match(v.href))}
      className={{
        container: "p-2 border-r",
        nav: "p-2 flex flex-col gap-2 w-max justify-evenly",
        link: {
          default: "flex items-center gap-2 hover:bg-secondary p-2 transition duration-150 rounded-md",
          selected: "text-white bg-primary flex items-center gap-2 p-2 transition duration-150 rounded-md"
        }
      }}
    />
  );
}
 
export default DashboardSidebar;
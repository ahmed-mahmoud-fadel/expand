"use client"

import Link from "next/link"
import { useState } from "react"

export type CollapsibleNavLink = {
  href: string,
  text: string,
  icon: React.ReactNode,
}

const CollapsibleSideNav = ({
  links,
  className,
  render,
  defaultState = true,
  selectedIndex = 0,
}: {
  links: CollapsibleNavLink[],
  render: (
    nav: React.ReactNode,
    toggleFunction: () => void,
    state: boolean,
  ) => React.ReactNode,
  defaultState?: boolean,
  className?: {
    container?: string,
    nav?: string,
    link?: {
      default?: string,
      selected?: string,
    },
  }
  selectedIndex: number,
}) => {
  const [open, setOpen] = useState(defaultState)

  return (
    <aside className={className?.container}>
      {
        render(
          <nav className={className?.nav}>
            {
              links.map((link, n) => {
                let cl = className?.link?.default
                if (n === selectedIndex && className?.link?.selected)
                  cl = className.link.selected

                return (
                  <Link href={link.href} className={cl} key={link.href}>
                    {link.icon}{open && link.text}
                  </Link>
                )
              })
            }
          </nav>,
          () => setOpen(p => !p),
          open,
        )
      }
    </aside>
  );
}
 
export default CollapsibleSideNav;
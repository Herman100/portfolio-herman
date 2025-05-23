"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavLink = ({ className, href, children }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={` 
        relative
        text-sm
        px-4 py-1
        text-base
        font-semibold
        rounded-full
        transition-all
        duration-300
        ease-in-out
        ${
          isActive
            ? "bg-primary text-white shadow-md "
            : "text-foreground/80 hover:text-primary hover:bg-primary/5"
        }
        focus:outline-none
        focus:ring-1
        focus:ring-primary
        focus:ring-opacity-50
        group
      `}
    >
      {children}
    </Link>
  );
};

export { NavLink };

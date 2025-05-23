"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={
        isActive
          ? "bg-primary text-m font-medium text-foreground/80 hover:text-primary transition-colors"
          : " text-m font-medium text-foreground/80 hover:text-primary transition-colors"
      }
    >
      {children}
    </Link>
  );
};

export { NavLink };

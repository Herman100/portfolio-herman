"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ThemeSwitcher } from "../themes/theme-toggle";
import { cn } from "@/lib/utils";
import { NavLink } from "../home/navlink";
import { usePathname } from "next/navigation";

const defaultNavItems = {
  home: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#skills", label: "Skills" },
    { href: "/contact", label: "Contact" },
  ],
  about: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "#intro", label: "Introduction" },
    { href: "#education", label: "Education" },
    { href: "/contact", label: "Contact" },
  ],
  contact: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "#get-in-touch", label: "Get In Touch" },
    { href: "#contact-info", label: "Info" },
  ],
};

export default function NavHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const currentPage =
    pathname === "/"
      ? "home"
      : (pathname.replace("/", "") as "about" | "contact");

  // Get navigation items based on current page or use custom items
  const navItems = defaultNavItems[currentPage] || defaultNavItems.home;

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking on a link
  const handleNavClick = () => {
    setIsOpen(false);
  };

  // Handle smooth scrolling for hash links
  const handleHashLink = (href: string, e?: React.MouseEvent) => {
    // Always close the mobile menu first
    setIsOpen(false);

    if (href.startsWith("#")) {
      e?.preventDefault();
      // Add a small delay to allow the sheet to close first
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border/40"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4 lg:py-6">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center gap-1 lg:gap-4 flex-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                onClick={(e: any) => handleHashLink(item.href, e)}
                className="px-3 py-2 text-sm lg:text-base font-medium text-foreground/80 hover:text-primary transition-colors rounded-md hover:bg-muted/50"
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Theme Switcher */}
          <div className="hidden md:flex items-center">
            <ThemeSwitcher />
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeSwitcher />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  aria-label="Toggle navigation menu"
                >
                  <Menu className="h-5 w-5" onClick={handleNavClick} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 sm:w-96">
                <SheetHeader>
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-6 mt-8">
                  {/* Mobile Navigation Links */}
                  <nav
                    className="flex flex-col space-y-2"
                    role="navigation"
                    aria-label="Mobile navigation"
                  >
                    {navItems.map((item) => (
                      <NavLink
                        key={item.href}
                        href={item.href}
                        onClick={(e) => handleHashLink(item.href, e)}
                        className="flex items-center px-4 py-3 text-lg font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </nav>

                  {/* Mobile Footer */}
                  <div className="pt-6 mt-auto border-t border-border">
                    <p className="text-sm text-muted-foreground text-center">
                      © 2024 Herman Kwamebour. All rights reserved.
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}

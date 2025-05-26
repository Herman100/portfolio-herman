import { ArrowRight, Mail, Phone, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { NavLink } from "../home/navlink";

export default function Footer() {
  return (
    <footer className="container mx-auto py-12 border-t border-border flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
        <div className="space-y-4 text-center ">
          <h3 className="text-lg font-bold text-foreground">
            Herman Kwamebour
          </h3>
          <p className="text-sm text-muted-foreground">
            Fullstack Engineer | Geoscientist.
          </p>
        </div>

        <div className="space-y-4 flex flex-col items-center">
          <h4 className="text-md font-semibold text-foreground">Quick Links</h4>
          <div className="flex flex-col space-y-2">
            <Link
              href="/"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/cv"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              CV
            </Link>
            <Link
              href="/#projects"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Projects
            </Link>
          </div>
        </div>

        <div className="space-y-4 flex flex-col items-center">
          <h4 className="text-md font-semibold text-foreground">Connect</h4>
          <div className="flex flex-col space-y-2">
            <a
              href="https://github.com/Herman100"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/herman-kwamebour/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </div>

        <div className="space-y-4 flex flex-col items-center">
          <h4 className="text-md font-semibold text-foreground">Contact</h4>
          <div className="flex flex-col space-y-2">
            <a
              href="mailto:hermankwamebour30@gmail.com"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
            <a
              href="tel:+233245765540"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              Phone
            </a>
          </div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground max-w-[300px] text-center mt-24">
        © {new Date().getFullYear()} Herman Kwamebour. All rights reserved.
      </p>
    </footer>
  );
}

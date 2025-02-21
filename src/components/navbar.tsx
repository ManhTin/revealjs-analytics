"use client";

import { LayoutDashboard, Logs, Presentation } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignInButton from "./sign-in-button";
import SignOutButton from "./sign-out-button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DarkModeToggle } from "./ui/dark-mode-toggle";
import { Separator } from "./ui/separator";

const PATHMAP = {
  "/": {
    title: "Dashboard",
  },
  "/presentations": {
    title: "Presentations",
  },
  "/events": {
    title: "Events",
  },
};

function NavLink({ path }: { path: keyof typeof PATHMAP }) {
  const pathname = usePathname();
  const { title } = PATHMAP[path];

  function linkIsActive(href: string) {
    return pathname === href ? "" : "text-gray-500";
  }

  return (
    <Link href={path} className={linkIsActive(path)}>
      <span>{title}</span>
    </Link>
  );
}

export default function Navbar() {
  const { data: session } = useSession();

  function shortUsername(username: string) {
    return username.slice(0, 2).toUpperCase();
  }

  return (
    <>
      <header className="px-6 py-2 mb-6 space-y-2">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <NavLink path="/" />
            <NavLink path="/presentations" />
            <NavLink path="/events" />
          </div>

          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            {session?.user ? (
              <>
                <SignOutButton />
                <Avatar>
                  <AvatarImage src={session.user.image!} />
                  <AvatarFallback>
                    {session.user.name ? shortUsername(session.user.name) : "US"}
                  </AvatarFallback>
                </Avatar>
              </>
            ) : (
              <SignInButton />
            )}
          </div>
        </nav>
        <Separator />
      </header>
    </>
  );
}

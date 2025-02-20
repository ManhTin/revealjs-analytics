"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignInButton from "./sign-in-button";
import SignOutButton from "./sign-out-button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DarkModeToggle } from "./ui/dark-mode-toggle";
import { Separator } from "./ui/separator";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  function shortUsername(username: string) {
    return username.slice(0, 2).toUpperCase();
  }

  function linkIsActive(href: string) {
    return pathname === href ? "" : "text-gray-500";
  }

  return (
    <>
      <header className="px-6 py-2 mb-6 space-y-2">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className={linkIsActive("/")}>
              <span>Overview</span>
            </Link>
            <Link href="/presentations" className={linkIsActive("/presentations")}>
              <span>Presentations</span>
            </Link>
            <Link href="/events" className={linkIsActive("/events")}>
              <span>Event Log</span>
            </Link>
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

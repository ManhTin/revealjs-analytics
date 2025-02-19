import { auth } from "@/lib/auth";
import Link from "next/link";
import { DarkModeToggle } from "./dark-mode-toggle";
import SignIn from "./sign-in";
import SignOut from "./sign-out";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default async function Navbar() {
  const session = await auth();

  function shortUsername(username: string) {
    return username.slice(0, 2).toUpperCase();
  }

  return (
    <header className="px-6 py-2 shadow-sm">
      <nav className="flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link href="/">
            <span>Overview</span>
          </Link>
          <Link href="/">
            <span>Presentations</span>
          </Link>
          <Link href="/">
            <span>Event Log</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <DarkModeToggle />
          {session?.user ? (
            <>
              <SignOut />
              <Avatar>
                <AvatarImage src={session.user.image!} />
                <AvatarFallback>
                  {session.user.name ? shortUsername(session.user.name) : "US"}
                </AvatarFallback>
              </Avatar>
            </>
          ) : (
            <SignIn />
          )}
        </div>
      </nav>
    </header>
  );
}

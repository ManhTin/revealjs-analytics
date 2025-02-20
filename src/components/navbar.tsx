import { auth } from "@/lib/auth";
import Link from "next/link";
import SignIn from "./sign-in";
import SignOut from "./sign-out";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DarkModeToggle } from "./ui/dark-mode-toggle";
import { Separator } from "./ui/separator";

export default async function Navbar() {
  const session = await auth();

  function shortUsername(username: string) {
    return username.slice(0, 2).toUpperCase();
  }

  return (
    <>
      <header className="px-6 py-2 mb-6 space-y-2">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/">
              <span>Overview</span>
            </Link>
            <Link href="/presentations">
              <span>Presentations</span>
            </Link>
            <Link href="/events">
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
        <Separator />
      </header>
    </>
  );
}

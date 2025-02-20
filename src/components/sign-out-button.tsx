import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignOutButton() {
  return (
    <Button variant="default" type="submit" onClick={() => signOut()}>
      Sign Out
    </Button>
  );
}

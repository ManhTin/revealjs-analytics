import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignOutButton() {
  return (
    <Button size="sm" variant="link" type="submit" onClick={() => signOut()}>
      <LogOut />
      <span>Sign Out</span>
    </Button>
  );
}

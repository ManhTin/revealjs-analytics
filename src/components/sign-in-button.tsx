import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignInButton() {
  return (
    <Button variant="default" type="submit" onClick={() => signIn()}>
      Sign In
    </Button>
  );
}

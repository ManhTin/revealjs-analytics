import { signIn } from "@/lib/auth";
import { Button } from "./ui/button";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button variant="default" type="submit">
        Sign In
      </Button>
    </form>
  );
}

import { signOut } from "@/lib/auth";
import { Button } from "./ui/button";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button variant="default" type="submit">
        Sign Out
      </Button>
    </form>
  );
}

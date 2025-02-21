import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { providerMap, signIn } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <p className="text-xl font-bold mb-6">Welcome to Reveal Analytics</p>
          <CardTitle className="text-2xl mb-6">Sign In</CardTitle>
          <CardDescription>Use one of the OAuth Providers below to Sign In / Up</CardDescription>
        </CardHeader>
        <Separator className="mb-6" />
        <CardContent>
          {Object.values(providerMap).map((provider) => (
            <form
              key={provider.id}
              action={async () => {
                "use server";
                try {
                  await signIn(provider.id, {
                    redirectTo: "/",
                  });
                } catch (error) {
                  if (error instanceof AuthError) {
                    return redirect(`/sign-in?error=${error.type}`);
                  }
                  throw error;
                }
              }}
            >
              <Button type="submit" className="w-full">
                <span>Sign in with {provider.name}</span>
              </Button>
            </form>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

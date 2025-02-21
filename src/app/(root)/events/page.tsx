import { EventTable } from "@/components/event/event-table";
import Header from "@/components/header";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function EventsPage() {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const userId = session.user?.id;

  const data = await prisma.event.findMany({
    where: {
      presentation: {
        userId: userId,
      },
    },
    take: 200,
    orderBy: {
      timestamp: "desc",
    },
  });

  return (
    <>
      <Header title="Event Log" />
      <EventTable data={data} />
    </>
  );
}

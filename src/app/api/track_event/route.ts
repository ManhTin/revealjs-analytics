import { prisma } from "@/lib/prisma";
import type { InputJsonValue } from "@prisma/client/runtime/library";

interface EventDto {
  presentationId: string;
  eventName: string;
  slideNumber: number;
  timestamp: Date;
  url: string;
  data?: InputJsonValue;
}

export async function POST(req: Request) {
  const receivedEvents: EventDto[] = await req.json();

  const events = await prisma.event.createMany({
    data: receivedEvents,
  });

  if (events) {
    return Response.json({
      status: 200,
    });
  }

  return Response.json({
    status: 500,
    body: {
      message: "An error occurred while saving the events",
    },
  });
}

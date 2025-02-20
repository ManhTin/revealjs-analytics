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
  const receivedEvent: EventDto = await req.json();
  console.log("🚀 ~ POST ~ res:", receivedEvent);

  const event = await prisma.event.create({
    data: receivedEvent,
  });

  return Response.json({ ...event });
}

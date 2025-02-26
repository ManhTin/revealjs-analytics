import { PrismaEventRepository } from "@/repositories/eventRepository";
import { EventPersistenceService } from "@/services/eventPersistenceService";
import { EventProcessingService, type LogEventsDto } from "@/services/eventProcessingService";

// Initialize dependencies
const eventRepository = new PrismaEventRepository();
const eventProcessingService = new EventProcessingService();
const eventPersistenceService = new EventPersistenceService(eventRepository);

export async function POST(req: Request) {
  try {
    const receivedEvents: LogEventsDto = await req.json();

    // Process events (convert string to enum types)
    const processedEvents = eventProcessingService.processEvents(receivedEvents);

    const result = await eventPersistenceService.persistEvents(processedEvents);

    if (result) {
      return Response.json({ status: 200 });
    }

    return Response.json({
      status: 500,
      body: { message: "An error occurred while saving the events" },
    });
  } catch (error) {
    console.error("Error processing event tracking:", error);
    return Response.json({
      status: 500,
      body: { message: "Failed to process events" },
    });
  }
}

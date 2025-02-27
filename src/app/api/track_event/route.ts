import { PrismaLogEventRepository } from "@/repositories/logEvent.repository";
import { LogEventPersistenceService } from "@/services/logEventPersistence.service";
import {
  LogEventProcessingService,
  type LogEventsDto,
} from "@/services/logEventProcessing.service";

// Initialize dependencies
const logEventRepository = new PrismaLogEventRepository();
const logEventProcessingService = new LogEventProcessingService();
const eventPersistenceService = new LogEventPersistenceService(logEventRepository);

export async function POST(req: Request) {
  try {
    const receivedEvents: LogEventsDto = await req.json();

    // Process events (convert string to enum types)
    const processedEvents = logEventProcessingService.call(receivedEvents);

    const result = await eventPersistenceService.call(processedEvents);

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

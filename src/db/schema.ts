import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const exampleTable = pgTable("example", {
  id: uuid().defaultRandom().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
});

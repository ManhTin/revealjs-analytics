import "dotenv/config";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { exampleTable } from "./schema";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  const example: typeof exampleTable.$inferInsert = {
    title: "First Example",
    description: "This is the first example.",
  };

  await db.insert(exampleTable).values(example);
  console.log("New example created!");

  const examples = await db.select().from(exampleTable);
  console.log("Getting all examples from the database: ", examples);

  await db
    .update(exampleTable)
    .set({
      description: "This is the first example after update.",
    })
    .where(eq(exampleTable.title, example.title));
  console.log("Example description updated!");

  await db.delete(exampleTable).where(eq(exampleTable.title, example.title));
  console.log("Example deleted!");
}

main();

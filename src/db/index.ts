import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle({
  connection: {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    connectionString: process.env.DATABASE_URL!,
    ssl: true,
  },
});

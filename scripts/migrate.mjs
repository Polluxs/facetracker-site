import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const url = process.env.DATABASE_URL;
if (!url) {
	console.error("DATABASE_URL missing");
	process.exit(1);
}

const client = postgres(url, { max: 1 });
const db = drizzle(client);

try {
	// assumes your generated SQL files live in ./drizzle
	await migrate(db, { migrationsFolder: "drizzle" });
	console.log("Migrations applied");
} finally {
	await client.end({ timeout: 1 });
}

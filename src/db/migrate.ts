import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { neon } from "@neondatabase/serverless"
import { config } from "dotenv";

config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

const runMigrate = async () => {
  console.log("⏳ Running migrations...");
  await migrate(db, { migrationsFolder: "./migrations" });
  console.log("✅ Migrations completed!");
  process.exit(0);
};

runMigrate().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});
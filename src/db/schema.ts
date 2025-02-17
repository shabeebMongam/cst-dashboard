import { integer, text, boolean, pgTable, timestamp, serial } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  userId: text('userId').notNull(),
  widgetIds: text("widget_ids").array().$type<string[]>().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

export const overallData = pgTable("overalldata", {
  id: integer('id').primaryKey(),
  userId: text('userId').references(() => user.id),
  data: text('data').notNull().default('{}'),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
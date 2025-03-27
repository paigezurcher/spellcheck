import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const essays = pgTable("essays", {
  id: serial("id").primaryKey(),
  originalText: text("original_text").notNull(),
  transformedText: text("transformed_text").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertEssaySchema = createInsertSchema(essays).pick({
  originalText: true,
  transformedText: true,
});

export const transformTextSchema = z.object({
  text: z.string().min(1, "Essay text is required")
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertEssay = z.infer<typeof insertEssaySchema>;
export type Essay = typeof essays.$inferSelect;
export type TransformTextInput = z.infer<typeof transformTextSchema>;
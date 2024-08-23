import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import * as schema from './schema';
import { users, products, settings, type InsertUser } from './schema';

const sqlite = new Database('database.sqlite');
export const db = drizzle(sqlite, { schema });

export const insertUser = (user: InsertUser) => {
	return db.insert(users).values(user).run();
};

if ((await db.select().from(users).all().length) == 0) {
	insertUser({
		email: 'test@test.test',
		password: "123"
	});
}

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const insertProductSchema = createInsertSchema(products);
export const selectProductSchema = createSelectSchema(products);
export const insertSettingSchema = createInsertSchema(settings);
export const selectSettingSchema = createSelectSchema(settings);

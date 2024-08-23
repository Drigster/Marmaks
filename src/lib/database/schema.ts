import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: integer('id').primaryKey().notNull().unique(),
	email: text('email').notNull(),
	password: text('password').notNull()
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type ProductImage = {
	imagePath: string;
	imageDescription: string;
};

export const products = sqliteTable('products', {
	id: integer('id').primaryKey().notNull().unique(),
	name: text('name').notNull(),
	description: text('description').notNull(),
	imageFilename: text('images').notNull()
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

export const settings = sqliteTable('settings', {
	id: integer('id').primaryKey().notNull().unique(),
	key: text('key').notNull(),
	value: text('value').notNull(),
	name: text('name').notNull()
});

export type Setting = typeof settings.$inferSelect;
export type InsertSetting = typeof settings.$inferInsert;

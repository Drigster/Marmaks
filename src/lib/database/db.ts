import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { eq } from 'drizzle-orm';
import * as schema from './schema';
import { products, settings, certificates } from './schema';

const sqlite = new Database('database.sqlite');
export const db = drizzle(sqlite, { schema });

export type Settings = {
	working_hours: string | '';
	phone1: string | '';
	phone2: string | '';
	email: string | '';
	adress: string | '';
	telegram: string | '';
	whatsapp: string | '';
	inn: string | '';
	kpp: string | '';
	ogrn: string | '';
};

const defaultSettings = [
	['working_hours', 'Время работы', 'Пн-Пт 10:00-20:00'],
	['phone1', 'Телефон 1', '+7 (123) 123-45-67'],
	['phone2', 'Телефон 2', '+7 (123) 123-45-67'],
	['email', 'Почта', 'test@test.test'],
	['adress', 'Адрес', 'Москва, улица абв, д12'],
	['telegram', 'Телеграм', 'https://telegram.org/'],
	['whatsapp', 'Ватсап', 'https://whatsapp.com/'],
	['inn', 'ИНН', '1234567890'],
	['kpp', 'КПП', '123456789'],
	['ogrn', 'ОГРН', '123456789101112']
];

defaultSettings.forEach(async (setting) => {
	if (
		(await await db.query.settings.findFirst({ where: eq(settings.key, setting[0]) })) == undefined
	) {
		await db
			.insert(settings)
			.values({
				key: setting[0],
				value: setting[2],
				name: setting[1]
			})
			.run();
	}
});

export const insertProductSchema = createInsertSchema(products);
export const selectProductSchema = createSelectSchema(products);
export const insertSettingSchema = createInsertSchema(settings);
export const selectSettingSchema = createSelectSchema(settings);
export const insertCertificateSchema = createInsertSchema(certificates);
export const selectCertificateSchema = createSelectSchema(certificates);

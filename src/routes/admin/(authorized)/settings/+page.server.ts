import { db, insertProductSchema, insertSettingSchema } from '$lib/database/db.js';
import { products, settings } from '$lib/database/schema.js';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { writeFile, rm } from 'fs/promises';
import { eq } from 'drizzle-orm';

export const load = async () => {
	const editForm = await superValidate(zod(insertSettingSchema.omit({ key: true })), {
		id: "edit"
	});

	const settingList = await db.select().from(settings).all();

	return { editForm, settingList };
};

export const actions = {
	edit: async ({ request }) => {
		const editForm = await superValidate(request, zod(insertSettingSchema.omit({ key: true })));

		if (!editForm.valid || editForm.data.id == undefined) {
			return fail(400, { editForm });
		}

		await db.update(settings).set({
			value: editForm.data.value,
		}).where(eq(settings.id, editForm.data.id));

		return message(editForm, "Настройка изменена");
	},
};
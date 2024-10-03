import { db } from '$lib/database/db.js';
import { settings } from '$lib/database/schema.js';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

const editSchema = z.object({
	key: z.string(),
	value: z.string()
});

export const load = async () => {
	const editForm = await superValidate(zod(editSchema), {
		id: 'edit'
	});

	const settingList = await db.select().from(settings).all();
	return { editForm, settingList };
};

export const actions = {
	edit: async ({ request }) => {
		const editForm = await superValidate(request, zod(editSchema));

		if (!editForm.valid) {
			return fail(400, { editForm });
		}

		await db
			.update(settings)
			.set({
				value: editForm.data.value
			})
			.where(eq(settings.key, editForm.data.key));

		return message(editForm, 'Настройка изменена');
	}
};

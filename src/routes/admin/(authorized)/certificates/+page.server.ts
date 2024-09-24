import { db, insertCertificateSchema } from '$lib/database/db.js';
import { certificates } from '$lib/database/schema.js';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { writeFile, rm, mkdir } from 'fs/promises';
import { eq } from 'drizzle-orm';

const createSchema = insertCertificateSchema.omit({ imageFilename: true }).extend({
	image: z.instanceof(File, { message: 'Please upload a file.' })
});

const deleteSchema = z.object({
	id: z.number().int().positive()
});

const editSchema = createSchema.omit({ image: true, id: true }).extend({
	id: z.number().nonnegative(),
	image: z.instanceof(File, { message: 'Please upload a file.' }).optional()
});

export const load = async () => {
	const createForm = await superValidate(zod(createSchema), {
		id: 'create'
	});
	const deleteForm = await superValidate(zod(deleteSchema), {
		id: 'delete'
	});
	const editForm = await superValidate(zod(createSchema), {
		id: 'edit'
	});
	const productList = await db.select().from(certificates).all();

	return { createForm, deleteForm, editForm, productList };
};

export const actions = {
	create: async ({ request }) => {
		const createForm = await superValidate(request, zod(createSchema));

		if (!createForm.valid) {
			return fail(400, { createForm });
		}

		const filenameSplit = createForm.data.image.name.split('.');
		const filename =
			Date.now() +
			'_' +
			Math.round(Math.random() * 10000) +
			'.' +
			filenameSplit[filenameSplit.length - 1];

		await mkdir("static/files", { recursive: true });
		await writeFile(
			`static/files/${filename}`,
			new Uint8Array(await createForm.data.image.arrayBuffer())
		);

		await db.insert(certificates).values({
			name: createForm.data.name,
			imageFilename: filename
		});

		return message(createForm, 'Продукт создан');
	},

	delete: async ({ request }) => {
		const deleteForm = await superValidate(request, zod(deleteSchema));

		if (!deleteForm.valid) {
			return fail(400, { deleteForm });
		}

		const product = await db.query.products.findFirst({
			where: eq(certificates.id, deleteForm.data.id)
		});

		await rm(`static/files/${product?.imageFilename}`, {
			force: true
		});

		await db.delete(certificates).where(eq(certificates.id, deleteForm.data.id));

		return message(deleteForm, 'Продукт удалён');
	},

	edit: async ({ request }) => {
		const editForm = await superValidate(request, zod(editSchema));

		if (!editForm.valid) {
			return fail(400, { editForm });
		}

		if (editForm.data.image != undefined) {
			const filenameSplit = editForm.data.image.name.split('.');
			const filename =
				Date.now() +
				'_' +
				Math.round(Math.random() * 10000) +
				'.' +
				filenameSplit[filenameSplit.length - 1];

			const product = await db.query.products.findFirst({
				where: eq(certificates.id, editForm.data.id)
			});

			await rm(`static/files/${product?.imageFilename}`, {
				force: true
			});
			await mkdir("static/files", { recursive: true });
			await writeFile(
				`static/files/${filename}`,
				new Uint8Array(await editForm.data.image.arrayBuffer())
			);

			await db
				.update(certificates)
				.set({
					name: editForm.data.name,
					imageFilename: filename
				})
				.where(eq(certificates.id, editForm.data.id));
		} else {
			await db
				.update(certificates)
				.set({
					name: editForm.data.name
				})
				.where(eq(certificates.id, editForm.data.id));
		}

		return message(editForm, 'Продукт изменён');
	}
};

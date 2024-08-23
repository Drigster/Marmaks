import { db } from '$lib/database/db.js';
import { categories, products } from '$lib/database/schema.js';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const product = await db.query.products.findFirst({
		where: eq(products.id, parseInt(params.id))
	});

	if (product == undefined) {
		return error(404);
	}

	const category = await db.query.categories.findFirst({
		where: eq(categories.id, product.categoryId)
	});

	return { product, category };
}
